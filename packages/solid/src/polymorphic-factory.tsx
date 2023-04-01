import { ValidComponent, Component, JSX, ComponentProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

type DOMElements = keyof JSX.IntrinsicElements

// any is required for the import('solid/web').ValidComponent typings:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ElementType = DOMElements | Component<any>

export type PropsOf<T extends ElementType> = ComponentProps<T> & {
  as?: ElementType
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

/**
 * Assign property types from right to left.
 * Think `Object.assign` for types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export type Assign<A, B> = DistributiveOmit<A, keyof B> & B

type MergeWithAs<
  Default extends ValidComponent,
  Component extends ValidComponent,
  PermanentProps extends Record<never, never>,
  DefaultProps extends Record<never, never>,
  ComponentProps extends Record<never, never>,
> =
  /**
   * The following code is copied from the library react-polymorphed by nasheomirro.
   * Thank your for creating this TypeScript gold!
   *
   * doing this makes sure typescript infers events. Without the
   * extends check typescript won't do an additional inference phase,
   * but somehow we can trick typescript into doing so. Note that the check needs to be relating
   * to the generic for this to work.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any extends Component
    ? /**
       * Merge<ComponentProps, OwnProps & { as?: Component }> looks sufficient,
       * but typescript won't be able to infer events on components that haven't
       * explicitly provided a value for the As generic or haven't provided an `as` prop.
       * We could do the same trick again like the above but discriminating unions should be
       * enough as we don't have to compute the value for the default.
       *
       * Also note that Merging here is needed not just for the purpose of
       * overriding props but also because somehow it is needed to get the props correctly,
       * Merge does clone the first object so that might have something to do with it.
       */
      | Assign<DefaultProps, PermanentProps & { as?: Default }>
        | Assign<ComponentProps, PermanentProps & { as?: Component }>
    : never

export type ComponentWithAs<
  Component extends ValidComponent,
  Props extends Record<never, never> = Record<never, never>,
> = {
  <AsComponent extends ValidComponent = Component>(
    props: MergeWithAs<
      Component,
      AsComponent,
      Props,
      ComponentProps<Component>,
      ComponentProps<AsComponent>
    >,
  ): JSX.Element
}

export type HTMLPolymorphicComponents<Props extends Record<never, never> = Record<never, never>> = {
  [Tag in DOMElements]: ComponentWithAs<Tag, Props>
}

export type HTMLPolymorphicProps<T extends ValidComponent> = Omit<ComponentProps<T>, 'ref'> & {
  as?: ValidComponent
}

type PolymorphFactory<
  Props extends Record<never, never> = Record<never, never>,
  Options = never,
> = {
  <T extends ValidComponent, P extends Record<never, never> = Props>(
    component: T,
    option?: Options,
  ): ComponentWithAs<T, P>
}

function defaultStyled(originalComponent: ValidComponent) {
  // any is required for the import('solid/web').ValidComponent typings:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: ComponentProps<ComponentWithAs<any>>) => {
    const [local, others] = splitProps(props, ['as'])
    const component = local.as || originalComponent

    return <Dynamic component={component} {...others} />
  }
}

interface PolyFactoryParam<
  Component extends ValidComponent,
  Props extends Record<never, never>,
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
  Props extends Record<never, never>,
  Options = never,
  Component extends ValidComponent = ValidComponent,
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
  }) as PolymorphFactory<Props, Options> & HTMLPolymorphicComponents<Props>
}
