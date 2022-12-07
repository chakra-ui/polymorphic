import {
  defineComponent,
  type ExtractPropTypes,
  type DefineComponent,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type VNodeProps,
} from 'vue'
import type { IntrinsicElementAttributes } from './dom.types'

export type DOMElements = keyof IntrinsicElementAttributes

export type ElementType = DOMElements | DefineComponent

export type ComponentWithAs<
  Component extends ElementType,
  P extends Record<string, unknown> = Record<never, never>,
> = {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      ExtractPropTypes<Component> &
      (Component extends keyof IntrinsicElementAttributes
        ? IntrinsicElementAttributes[Component]
        : Record<never, never>) &
      P & {
        as?: ElementType
      }
  }
}

export type HTMLPolymorphicComponents = {
  [Tag in DOMElements]: ComponentWithAs<Tag>
}

export type HTMLPolymorphicProps<T extends ElementType> = Omit<ExtractPropTypes<T>, 'ref'> & {
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
  return defineComponent({
    props: ['as'],
    setup(props, { slots, attrs }) {
      const Component = props.as || originalComponent
      return () => <Component {...attrs}>{slots}</Component>
    },
  }) as ComponentWithAs<never>
}

interface PolyFactoryParam<
  Component extends ElementType,
  Props extends Record<string, unknown>,
  Options,
> {
  styled?: (component: Component, options?: Options) => ComponentWithAs<Component, Props>
}

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
