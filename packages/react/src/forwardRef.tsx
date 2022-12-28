import {
  type ClassAttributes,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ElementRef,
  type ElementType,
  forwardRef as forwardRefReact,
  type ForwardRefRenderFunction,
  type ValidationMap,
  type WeakValidationMap,
} from 'react'

export type AsProp<AsComponent extends ElementType = ElementType> = {
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
export type Assign<Target, Source> = Omit<Target, 'as' | keyof Source> & Source

export type ComponentWithAs<Component extends ElementType, Props = Record<never, never>> = {
  <
    AsComponent extends ElementType = Component,
    AsComponentProps = PropsOf<AsComponent>,
    ComponentProps = PropsOf<Component>,
    Ref extends ElementRef<never> = ComponentRef<AsComponent>,
  >(
    props: (AsComponentProps extends ComponentProps
      ? Assign<AsComponentProps, Props>
      : Assign<Assign<ComponentProps, AsComponentProps>, Props>) &
      AsProp<AsComponent> &
      ClassAttributes<Ref>,
  ): JSX.Element

  displayName?: string
  propTypes?: WeakValidationMap<unknown>
  contextTypes?: ValidationMap<unknown>
  id?: string
}

export function forwardRef<Component extends ElementType, Props = Record<never, never>>(
  component: ForwardRefRenderFunction<never, Assign<PropsOf<Component>, Props>> & AsProp,
) {
  return forwardRefReact(component) as unknown as ComponentWithAs<Component, Props>
}
