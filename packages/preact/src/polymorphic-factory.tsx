import { type ComponentWithAs, ElementType, forwardRef, type PropsOf } from './forwardRef'
import type { JSX } from 'preact'

type DOMElements = keyof JSX.IntrinsicElements

export type HTMLPolymorphicComponents = {
  [Tag in DOMElements]: ComponentWithAs<Tag>
}

export type HTMLPolymorphicProps<T extends ElementType> = Omit<PropsOf<T>, 'ref'> & {
  as?: ElementType
}

type PolymorphFactory = {
  <
    T extends ElementType,
    P extends Record<string, unknown> = Record<never, never>,
    Options = never,
  >(
    component: T,
    option?: Options,
  ): ComponentWithAs<T, P>
}

function defaultStyled(originalComponent: ElementType) {
  return forwardRef((props, ref) => {
    const { as, ...restProps } = props
    const Component = as || originalComponent
    return <Component {...restProps} ref={ref} />
  })
}

interface PolyFactoryParam<
  Component extends ElementType,
  Props extends Record<string, unknown>,
  Options,
> {
  styled?: (component: Component, options?: Options) => ComponentWithAs<Component, Props>
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
export function polymorphicFactory<
  Component extends ElementType,
  Props extends Record<string, unknown>,
  Options = never,
>({ styled = defaultStyled }: PolyFactoryParam<Component, Props, Options> = {}) {
  const cache = new Map<Component, ComponentWithAs<Component, Props>>()

  return new Proxy(styled, {
    /**
     * @example
     * const Div = poly("div")
     * const WithPoly = poly(AnotherComponent)
     */
    apply(target, thisArg, argArray: [Component, Options]) {
      return styled(...argArray)
    },
    /**
     * @example
     * <poly.div />
     */
    get(_, element) {
      const asElement = element as Component
      if (!cache.has(asElement)) {
        cache.set(asElement, styled(asElement))
      }
      return cache.get(asElement)
    },
  }) as PolymorphFactory & HTMLPolymorphicComponents
}
