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

Replace the `as` prop with the `asChild` prop and add a child component accordingly. All props will
be forwarded to the child component.

```diff
- <Button as="a" className="button" href="https://chakra-ui.com" />
+ <Button className="button" asChild>
+   <a href="https://chakra-ui.com" />
+ </Button>
```

The `styled` function was renamed to `render`. The `render` function is a customizable function that
is used to render the component. The default implementation is the `defaultPolymorphicRender`
function.

```diff
+ import { defaultPolymorphicRender } from '@polymorphic-factory/react'

const poly = polymorphicFactory({
-  styled: (component, options) => (props) => {
-    const Component = props.as || component
-    return <Component data-custom-styled data-options={JSON.stringify(options)} {...props} />
+  render: (component, options) => (props) => {
+    // use the default implementation to handle the `asChild` prop
+    const polymorphicRender = defaultPolymorphicRender(component, options)
+    return polymorphicRender({
+      'data-custom-styled': true,
+      'data-options': JSON.stringify(options),
+      ...props,
+    })
  },
})
```
