import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ElementType,
  type ForwardRefRenderFunction,
  type RefAttributes,
  type ValidationMap,
  type WeakValidationMap,
  forwardRef as forwardRefReact,
  ComponentRef,
} from 'react'

type AsProp<AsComponent extends ElementType = ElementType> = {
  as?: AsComponent
}

export type PropsOf<Component extends ElementType> = JSX.LibraryManagedAttributes<
  Component,
  ComponentPropsWithoutRef<Component>
>

/**
 * Assign property types from right to left.
 * Think `Object.assign` for types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export type Assign<
  Target extends Record<string, unknown>,
  Source extends Record<string, unknown>,
> = Omit<Target, keyof Source> & Source

export type ComponentWithAs<
  Component extends ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
> = {
  <
    AsComponent extends ElementType = Component,
    Ref extends ElementRef<never> = ComponentRef<AsComponent>,
  >(
    props: Assign<PropsOf<AsComponent>, Props> & RefAttributes<Ref> & AsProp<AsComponent>,
  ): JSX.Element

  displayName?: string
  propTypes?: WeakValidationMap<unknown>
  contextTypes?: ValidationMap<unknown>
  id?: string
}

export function forwardRef<
  Component extends ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
>(component: ForwardRefRenderFunction<never, Assign<PropsOf<Component>, Props>> & AsProp) {
  return forwardRefReact(component) as unknown as ComponentWithAs<Component, Props>
}
