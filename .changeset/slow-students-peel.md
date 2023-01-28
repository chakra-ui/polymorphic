---
'@polymorphic-factory/preact': minor
'@polymorphic-factory/react': minor
'@polymorphic-factory/solid': minor
---

Fixed an issue where the factory options type `polymorphicFactory<P, Options>()` did not propagate
to the factory function `poly("div", options)`. **This is possibly a breaking change for TypeScript
users.**

```tsx
type AdditionalProps = Record<never, never>
type Options = { 'data-custom-option': string }

const poly = polymorphicFactory<AdditionalProps, Options>({
  styled: (component, options) => (props) => {
    const Component = props.as || component
    return <Component data-custom-styled data-options={JSON.stringify(options)} {...props} />
  },
})
const CustomDiv = poly('div', { 'data-custom-option': 'hello' })
```
