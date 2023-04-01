---
'@polymorphic-factory/solid': minor
---

When using the `as` prop, the `ref` will now be typed accordingly.

**This is possibly a breaking change for TypeScript users.**

```tsx
let ref: HTMLAnchorElement = undefined
return <poly.button as="a" ref={ref} />
```
