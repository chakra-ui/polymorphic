# @polymorphic-factory/react

## Installation

```bash
npm install @polymorphic-factory/react
```

or

```bash
yarn add @polymorphic-factory/react
```

or

```bash
pnpm install @polymorphic-factory/react
```

## Usage

Import the polymorphic factory and create your element factory.

```ts
import { polymorphicFactory } from '@polymorphic-factory/react'
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

const App = () => {
  return <poly.div hello="world" />
  // renders <div data-custom-styled data-options="{ \"hello\": \"world\" }" />
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

## License

MIT © [Tim Kolberger](https://github.com/timkolberger)
