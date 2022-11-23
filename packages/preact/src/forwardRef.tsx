import type { ComponentProps, Context, JSX } from 'preact'
import { ForwardFn, forwardRef as forwardRefPreact } from 'preact/compat'

export type ElementType = JSX.ElementType

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends ElementType> = ComponentProps<T> & {
  as?: ElementType
}

/**
 * Assign property types from right to left.
 * Think `Object.assign` for types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export type Assign<Target, Source> = Omit<Target, keyof Source> & Source

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends string | number | symbol = never,
> = Omit<Target, 'transition' | 'as' | 'color' | OmitAdditionalProps>

type AssignCommon<
  SourceProps extends Record<string, unknown> = Record<never, never>,
  OverrideProps extends Record<string, unknown> = Record<never, never>,
> = Assign<OmitCommonProps<SourceProps>, OverrideProps>

type MergeWithAs<
  ComponentProps extends Record<string, unknown>,
  AsProps extends Record<string, unknown>,
  AdditionalProps extends Record<string, unknown> = Record<never, never>,
  AsComponent extends ElementType = ElementType,
> = AssignCommon<ComponentProps, AdditionalProps> &
  AssignCommon<AsProps, AdditionalProps> & {
    as?: AsComponent
  }

export type ComponentWithAs<
  Component extends ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
> = {
  <AsComponent extends ElementType = Component>(
    props: MergeWithAs<ComponentProps<Component>, ComponentProps<AsComponent>, Props, AsComponent>,
  ): JSX.Element

  displayName?: string
  contextTypes?: Context<unknown>
  defaultProps?: Partial<unknown>
  id?: string
}

export function forwardRef<
  Component extends ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
>(
  component: ForwardFn<
    AssignCommon<PropsOf<Component>, Props> & {
      as?: ElementType
    }
  >,
) {
  return forwardRefPreact(component) as unknown as ComponentWithAs<Component, Props>
}
