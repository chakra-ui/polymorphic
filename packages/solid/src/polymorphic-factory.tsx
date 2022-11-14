import { ValidComponent, Component, JSX, ComponentProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

type DOMElements = keyof JSX.IntrinsicElements

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ElementType = DOMElements | Component<any>

/**
 * Assign property types from right to left.
 * Think `Object.assign` for types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export type Assign<Target, Source> = Omit<Target, keyof Source> & Source

/**
 * Extract the props of a solid element or component
 */
export type PropsOf<T extends ElementType> = ComponentProps<T> & {
  as?: ElementType
}

export type ComponentWithAs<T extends ValidComponent, Props = Record<never, never>> = Component<
  Assign<Assign<ComponentProps<T>, Props>, { as?: ElementType }>
>

export type HTMLPolymorphicComponents = {
  [Tag in DOMElements]: ComponentWithAs<Tag>
}

export type HTMLPolymorphicProps<T extends ElementType> = Omit<ComponentProps<T>, 'ref'> & {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: ComponentProps<ComponentWithAs<any>>) => {
    const [local, others] = splitProps(props, ['as'])
    const component = local.as || originalComponent

    return <Dynamic component={component} {...others} />
  }
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
