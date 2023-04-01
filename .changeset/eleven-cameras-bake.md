---
'@polymorphic-factory/react': minor
---

When using the `as` prop, the `ref` will now be typed accordingly. 

**This is possibly a breaking change for TypeScript users.**

```tsx
const ref = useRef<HTMLAnchorElement>(null)
return <poly.button as="a" ref={ref} />
```
