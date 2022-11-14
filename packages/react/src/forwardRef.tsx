import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ForwardRefRenderFunction,
  type ValidationMap,
  type WeakValidationMap,
  forwardRef as forwardRefReact,
} from 'react'

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends ElementType> = ComponentPropsWithoutRef<T> & {
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
  SourceProps extends Record<never, never> = Record<never, never>,
  OverrideProps extends Record<never, never> = Record<never, never>,
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
  propTypes?: WeakValidationMap<unknown>
  contextTypes?: ValidationMap<unknown>
  defaultProps?: Partial<unknown>
  id?: string
}

export function forwardRef<
  Component extends ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
>(
  component: ForwardRefRenderFunction<
    unknown,
    AssignCommon<ComponentProps<Component>, Props> & {
      as?: ElementType
    }
  >,
) {
  return forwardRefReact(component) as unknown as ComponentWithAs<Component, Props>
}
