import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef as forwardRefReact,
  type ForwardRefRenderFunction,
  type ValidationMap,
  type WeakValidationMap,
} from 'react'

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends ElementType> = ComponentPropsWithoutRef<T> & {
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
  Default extends ElementType,
  Component extends ElementType,
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
  Component extends ElementType,
  Props extends Record<never, never> = Record<never, never>,
> = {
  <AsComponent extends ElementType = Component>(
    props: MergeWithAs<
      Component,
      AsComponent,
      Props,
      ComponentProps<Component>,
      ComponentProps<AsComponent>
    >,
  ): JSX.Element

  displayName?: string
  propTypes?: WeakValidationMap<unknown>
  contextTypes?: ValidationMap<unknown>
  id?: string
}

export function forwardRef<
  Component extends ElementType,
  Props extends Record<never, never> = Record<never, never>,
>(
  component: ForwardRefRenderFunction<
    never,
    Assign<PropsOf<Component>, Props> & { as?: ElementType }
  >,
) {
  return forwardRefReact(component) as unknown as ComponentWithAs<Component, Props>
}
