import type { ElementType } from 'react'
import { type ComponentWithAs, forwardRef, type PropsOf, type AsProp } from './forwardRef'

type DOMElements = keyof JSX.IntrinsicElements

export type HTMLPolymorphicComponents<Props = Record<never, never>> = {
  [Tag in DOMElements]: ComponentWithAs<Tag, Props>
}

export type HTMLPolymorphicProps<T extends ElementType> = PropsOf<T> & AsProp

type PolymorphFactory<Props = Record<never, never>, Options = never> = {
  <T extends ElementType, P = Props>(component: T, option?: Options): ComponentWithAs<T, P>
}

function defaultStyled(originalComponent: ElementType) {
  return forwardRef((props, ref) => {
    const { as, ...restProps } = props
    const Component = as || originalComponent
    return <Component {...restProps} ref={ref} />
  })
}

interface PolyFactoryParam<Props, Options> {
  styled?: (component: ElementType, options?: Options) => ComponentWithAs<ElementType, Props>
}

/**
 * Create a polymorphic factory, which is an object of JSX elements to render React Components accepting the `as` prop.
 *
 * @example
 * const poly = polymorphicFactory()
 * <poly.div /> // => renders div
 * <poly.main /> // => renders main
 * <poly.section as="main" /> => // renders main
 */
export function polymorphicFactory<Props = Record<never, never>, Options = never>({
  styled = defaultStyled,
}: PolyFactoryParam<Props, Options> = {}) {
  const cache = new Map<ElementType, ComponentWithAs<ElementType, Props>>()

  return new Proxy(styled, {
    /**
     * @example
     * const Div = poly("div")
     * const WithPoly = poly(AnotherComponent)
     */
    apply(target, thisArg, argArray: [ElementType, Options]) {
      return styled(...argArray)
    },
    /**
     * @example
     * <poly.div />
     */
    get(_, element) {
      const asElement = element as ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, styled(asElement))
      }
      return cache.get(asElement)
    },
  }) as PolymorphFactory<Props, Options> & HTMLPolymorphicComponents<Props>
}
