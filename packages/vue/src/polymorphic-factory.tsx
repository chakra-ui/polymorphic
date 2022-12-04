import {
  defineComponent,
  h,
  type PropType,
  type ExtractPropTypes,
  type DefineComponent,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type VNodeProps,
} from 'vue'
import type { IntrinsicElementAttributes } from './dom.types'

export type DOMElements = keyof IntrinsicElementAttributes

export type ElementType = DOMElements | DefineComponent

export type ComponentWithAs<P = Record<never, never>> = {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps & { props?: Record<keyof P, any> } & P & {
        as?: ElementType
      }
  }
}

export type HTMLPolymorphicComponents = {
  [Tag in DOMElements]: ElementType
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
  ): ComponentWithAs<P>
}

function defaultStyled(originalComponent: ElementType) {
  return defineComponent({
    props: {
      as: {
        type: String as PropType<DOMElements>,
        default: '',
      },
    },
    setup(props, { slots, attrs }) {
      const component = props.as || originalComponent
      return () => h(component, attrs, slots)
    },
  }) as ComponentWithAs<Record<string, unknown>>
}

interface PolyFactoryParam<Component extends ElementType, Options> {
  styled?: (component: Component, options?: Options) => ComponentWithAs
}

export function polymorphicFactory<Component extends ElementType, Options = never>({
  styled = defaultStyled,
}: PolyFactoryParam<Component, Options> = {}) {
  const cache = new Map<Component, ComponentWithAs>()

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
