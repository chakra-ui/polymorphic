import type { ComponentProps, ElementType, ValidationMap, WeakValidationMap } from 'react'

/**
 * Assign property types from right to left.
 * Think `Object.assign` for types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export type Assign<Target, Source> = Omit<Target, keyof Source> & Source

export type WithAsChildProps<T> = Assign<T, { asChild?: boolean }>

export interface ComponentWithAsChild<
  Component extends ElementType = ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
> {
  (props: WithAsChildProps<Assign<ComponentProps<Component>, Props>>): JSX.Element

  displayName?: string
  propTypes?: WeakValidationMap<unknown>
  contextTypes?: ValidationMap<unknown>
  defaultProps?: Partial<unknown>
  id?: string
}
