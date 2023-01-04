---
'@polymorphic-factory/react': minor
---

- When using the `as` prop, the `ref` will now be typed accordingly. **This is possibly a breaking
  change for TypeScript users.**

  ```tsx
  const ref = React.useRef<HTMLAnchorElement>(null)
  return <poly.button as="a" ref={ref} />
  ```

- Removed the member `defaultProps` from the type `ComponentWithAs` to support React 18.3.0. **This
  is possibly a breaking change for TypeScript users.**

- The `polymorphicFactory` and the type `HTMLPolymorphicComponents` now accept an optional generic
  to specify additional props.

  ```tsx
  const poly = polymorphicFactory<{ background: 'red' | 'blue' }>()

  const App = () => <poly.div background="red" />
  ```
