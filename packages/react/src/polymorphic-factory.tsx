import type { ComponentWithAsChild, WithAsChildProps } from './as-child'
import {
  Children,
  cloneElement,
  ComponentPropsWithRef,
  type ElementType,
  forwardRef,
  isValidElement,
  ReactNode,
} from 'react'
import { mergeRefs, SupportedRef } from './merge-refs'

type DOMElements = keyof JSX.IntrinsicElements

export type HTMLPolymorphicComponents<
  Props extends Record<string, unknown> = Record<never, never>,
> = {
  [Tag in DOMElements]: ComponentWithAsChild<Tag, Props>
}

export type HTMLPolymorphicProps<T extends ElementType> = WithAsChildProps<ComponentPropsWithRef<T>>

type PolymorphFactory<
  Props extends Record<string, unknown> = Record<never, never>,
  Options = never,
> = {
  <T extends ElementType, P extends Record<string, unknown> = Props>(
    component: T,
    option?: Options,
  ): ComponentWithAsChild<T, P>
}

export function defaultPolymorphicRender(OriginalComponent: ElementType) {
  return forwardRef<unknown, WithAsChildProps<{ children?: ReactNode }>>((props, ref) => {
    const { asChild, children, ...restProps } = props

    if (!asChild) {
      return (
        <OriginalComponent {...restProps} ref={ref}>
          {children}
        </OriginalComponent>
      )
    }

    const onlyChild = Children.only(children)
    if (!isValidElement(onlyChild)) {
      return <>{onlyChild}</>
    }

    const view = cloneElement(onlyChild, {
      ...restProps,
      ref: mergeRefs([ref, (onlyChild as { ref?: SupportedRef }).ref]),
      ...onlyChild.props,
    })
    return <>{view}</>
  }) as ComponentWithAsChild
}

interface PolyFactoryParam<
  Component extends ElementType,
  Props extends Record<string, unknown>,
  Options,
> {
  render?: (component: Component, options?: Options) => ComponentWithAsChild<Component, Props>
}

/**
 * Create a polymorphic factory, which is an object of JSX elements to render React Components accepting the `as` prop.
 *
 * @example
 * const poly = polymorphicFactory()
 * <poly.div /> // => renders div
 * <poly.main /> // => renders main
 * <poly.section asChild><main /></poly.section> => // renders main
 */
export function polymorphicFactory<
  Props extends Record<never, never>,
  Options = never,
  Component extends ElementType = ElementType,
>({ render = defaultPolymorphicRender }: PolyFactoryParam<Component, Props, Options> = {}) {
  const cache = new Map<Component, ComponentWithAsChild<Component, Props>>()

  return new Proxy(render, {
    /**
     * @example
     * const Div = poly("div")
     * const WithPoly = poly(AnotherComponent)
     */
    apply(target, thisArg, argArray: [Component, Options]) {
      return render(...argArray)
    },
    /**
     * @example
     * <poly.div />
     */
    get(_, element) {
      const asElement = element as Component
      if (!cache.has(asElement)) {
        cache.set(asElement, render(asElement))
      }
      return cache.get(asElement)
    },
  }) as PolymorphFactory<Props, Options> & HTMLPolymorphicComponents<Props>
}
