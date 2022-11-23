<h1 align="center">@polymorphic-factory</h1>

<p align="center">
  <img alt="CodeCov" src="https://codecov.io/gh/chakra-ui/polymorphic/branch/main/graph/badge.svg?token=GISB4HXIK7"/>
  <img alt="MIT License" src="https://img.shields.io/github/license/chakra-ui/polymorphic"/>
  <img alt="Github Stars" src="https://badgen.net/github/stars/chakra-ui/polymorphic" />
</p>

Create polymorphic React/SolidJS components with a customizable `styled` function.

A polymorphic component is a component that can be rendered with a different element.

```tsx
import { polymorphicFactory } from '@polymorphic-factory/{react,solid}'

const poly = polymorphicFactory()

const App = () => (
  <>
    <poly.div />
    <poly.main>
      <poly.section>
        <poly.div as="p">This is rendered as a p element</poly.div>
      </poly.section>
    </poly.main>
  </>
)
```

> **Known drawbacks for the type definitions:**
>
> Event handlers are not typed correctly when using the `as` prop.
>
> This is a deliberate decision to keep the usage as simple as possible.

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages:

### Packages

- [react](./packages/react/README.md)
- [preact](./packages/preact/README.md)
- [solid](./packages/solid/README.md)

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
