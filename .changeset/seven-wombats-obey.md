---
'@polymorphic-factory/react': minor
---

#### BREAKING CHANGES

- dropped support for the `as` prop and introduced the `asChild` prop.
- removed the overloaded `forwardRef` function, use `React.forwardRef` instead.

#### Motivation

The `as` prop is a neat functionality, but it has some drawbacks that are hard to overcome. The main
issue is that it's hardly possible to type the `as` prop in a way that it's compatible with the
`ref` prop without adding complexity to the user land codebase. This means that the `ref` prop is
not type-safe.

The `asChild` prop is a good alternative for this issue. It's not as neat as the `as` prop, but it's
type-safe.

#### Migration path

##### Before

```tsx
<Button as="a" href="https://chakra-ui.com" />
```

##### After

```tsx
<Button asChild>
  <a href="https://chakra-ui.com" />
</Button>
```
