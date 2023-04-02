<h1 align="center">@polymorphic-factory/preact</h1>

<p align="center">
  <a href="https://codecov.io/gh/chakra-ui/polymorphic"> 
    <img alt="CodeCov" src="https://codecov.io/gh/chakra-ui/polymorphic/branch/main/graph/badge.svg?token=GISB4HXIK7&flag=preact" /> 
  </a>
  <a href="https://github.com/chakra-ui/polymorphic/blob/main/LICENSE.md"> 
    <img alt="MIT License" src="https://img.shields.io/github/license/chakra-ui/polymorphic" />
  </a>
  <a href="https://github.com/chakra-ui/polymorphic/stargazers"> 
    <img alt="Github Stars" src="https://badgen.net/github/stars/chakra-ui/polymorphic" />
  </a>
  <a href="https://bundlephobia.com/package/@polymorphic-factory/preact">
    <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@polymorphic-factory/preact"/>
  </a>
  <a href="https://www.npmjs.com/package/@polymorphic-factory/preact">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@polymorphic-factory/preact?style=flat"/>
  </a>
</p>

Create polymorphic Preact components with a customizable `styled` function.

A polymorphic component is a component that can be rendered with a different element. This is useful
for component libraries that want to provide a consistent API for their users and want to allow them
to customize the underlying element.

## Installation

```bash
npm install @polymorphic-factory/preact
```

or

```bash
yarn add @polymorphic-factory/preact
```

or

```bash
pnpm install @polymorphic-factory/preact
```

## Usage

Import the polymorphic factory and create your element factory.

```ts
import { polymorphicFactory } from '@polymorphic-factory/preact'
const poly = polymorphicFactory()
```

### Custom `styled` function

You can override the default implementation by passing `styled` function in the options.

```tsx
const poly = polymorphicFactory({
  styled: (component, options) => (props) => {
    const Component = props.as || component
    return <Component data-custom-styled data-options={JSON.stringify(options)} {...props} />
  },
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
const OriginalComponent = (props) => <div data-original="true" {...props}></div>
const MyComponent = poly(OriginalComponent)

const App = () => <MyComponent />
// render <div data-original="true" />
```

It still supports the `as` prop, which would replace the `OriginalComponent`.

```tsx
<MyComponent as="div" />
// renders <div />
```

## Refs

You can use `ref` on the component, and it will have the correct typings.

```tsx
const App = () => {
  const ref = useRef<HTMLAnchorElement>(null)
  return <poly.button as="a" ref={ref} />
}
```

## Types

```ts
import type { HTMLPolymorphicComponents, HTMLPolymorphicProps } from '@polymorphic-factory/preact'

type PolymorphicDiv = HTMLPolymorphicComponents['div']
type DivProps = HTMLPolymorphicProps<'div'>
```

## License

MIT © [Tim Kolberger](https://github.com/timkolberger)
