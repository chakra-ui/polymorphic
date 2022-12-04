<h1 align="center">@polymorphic-factory/vue</h1>

<p align="center">
  <img alt="CodeCov" src="https://codecov.io/gh/chakra-ui/polymorphic/branch/main/graph/badge.svg?token=GISB4HXIK7"/>
  <img alt="MIT License" src="https://img.shields.io/github/license/chakra-ui/polymorphic"/>
  <img alt="Github Stars" src="https://badgen.net/github/stars/chakra-ui/polymorphic" />
  <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@polymorphic-factory/vue"/>
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@polymorphic-factory/vue?style=flat"/>
</p>

Create polymorphic VueJS components with a customizable `styled` function.

A polymorphic component is a component that can be rendered with a different element.

> **Known drawbacks for the type definitions:**
>
> Event handlers are not typed correctly when using the `as` prop.
>
> This is a deliberate decision to keep the usage as simple as possible.

## Installation

```bash
npm install @polymorphic-factory/vue
```

or

```bash
yarn add @polymorphic-factory/vue
```

or

```bash
pnpm install @polymorphic-factory/vue
```

## Usage

Import the polymorphic factory and create your element factory.

```ts
import { polymorphicFactory } from '@polymorphic-factory/vue'
const poly = polymorphicFactory()
```

### Custom `styled` function

You can override the default implementation by passing `styled` function in the options.

```tsx
import { defineComponent } from 'vue'
const poly = polymorphicFactory({
  styled: (originalComponent, options) =>
    defineComponent({
      props: {
        as: {
          type: String as PropType<DOMElements>,
          default: '',
        },
      },
      setup(props, { slots, attrs }) {
        const component = props.as || originalComponent

        return () =>
          h(
            component,
            { 'data-custom-styled': true, 'data-options': JSON.stringify(options), ...attrs },
            slots,
          )
      },
    }),
})

const WithOptions = poly('div', { hello: 'world' })

const App = () => {
  return (
    <>
      <poly.div hello="world" />
      {/* renders <div data-custom-styled hello="world" /> */}

      <WithOptions />
      {/* renders <div data-custom-styled data-options="{ \"hello\": \"world\" }" /> */}
    </>
  )
}
```

### Inline

Use the element factory to create elements inline.
Every JSX element is supported `div`, `main`, `aside`, etc.

```tsx
<>
  <poly.div />
  <poly.main>
    <poly.section>
      <poly.div as="p">This is rendered as a p element</poly.div>
    </poly.section>
  </poly.main>
</>
```

### Factory

Use the factory to wrap custom components.

```tsx
const OriginalComponent = defineComponent({
  setup(props) {
    return () => <div data-original="true" {...props} />
  },
})
const MyComponent = poly(OriginalComponent)

const App = h(MyComponent)
// render <div data-original="true" />
```

It still supports the `as` prop, which would replace the `OriginalComponent`.

```tsx
<MyComponent as="div" />
// renders <div />
```

## Types

```ts
import type { HTMLPolymorphicComponents, HTMLPolymorphicProps } from '@polymorphic-factory/vue'

type PolymorphicDiv = HTMLPolymorphicComponents['div']
type DivProps = HTMLPolymorphicProps<'div'>
```

## License

MIT © [Tim Kolberger](https://github.com/timkolberger)
