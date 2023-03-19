<h1 align="center">@polymorphic-factory</h1>

<p align="center">
  <img alt="CodeCov" src="https://codecov.io/gh/chakra-ui/polymorphic/branch/main/graph/badge.svg?token=GISB4HXIK7"/>
  <img alt="MIT License" src="https://img.shields.io/github/license/chakra-ui/polymorphic"/>
  <img alt="Github Stars" src="https://badgen.net/github/stars/chakra-ui/polymorphic" />
</p>

Create polymorphic React/Preact/SolidJS/Vue components with a customizable `render` function.

A polymorphic component is a component that can be rendered with a different element. This is useful
for component libraries that want to provide a consistent API for their users and want to allow them
to customize the underlying element.

> ℹ️
>
> The React package is using the `asChild` prop to forward all props to the only child element.
>
> The other packages are using the `as` prop to forward all props to the underlying element - which
> will change with upcoming releases.

```tsx
import { polymorphicFactory } from '@polymorphic-factory/{react,preact,solid,vue}'

const poly = polymorphicFactory()

const App = () => (
  <>
    <poly.div />
    <poly.main>
      <poly.section>
        <poly.button className="button" asChild>
          <a href="https://chakra-ui.com">Looks like a button</a>
        </poly.button>
      </poly.section>
    </poly.main>
  </>
)
```

This monorepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages:

## Packages

- [react](./packages/react/README.md)
- [preact](./packages/preact/README.md)
- [solid](./packages/solid/README.md)
- [vue](./packages/vue/README.md)

## Development

Install the dependencies with pnpm:

```sh
pnpm install
```

To build all packages, run the following command:

```sh
pnpm run build
```

To execute all test suites, run the following command:

```sh
pnpm run test
```

You can execute npm scripts in each package with the shortcut commands:

```sh
# pnpm run <package> <command>
pnpm run react test
pnpm run solid build
```

### Versioning

This repository uses [changesets](https://github.com/changesets/changesets) to version and publish
the packages.

To create a semver bump, create a changeset with a summary of the changes made:

```sh
pnpm changeset
```

## License

MIT © [Tim Kolberger](https://github.com/timkolberger)
