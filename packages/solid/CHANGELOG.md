# @polymorphic-factory/solid

## 0.3.1

### Patch Changes

- [`4daf9a4`](https://github.com/chakra-ui/polymorphic/commit/4daf9a414dc062610c47467fe7c86bac0904d7ca) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the typings for the as prop where to restrictive.

## 0.3.0

### Minor Changes

- [#327](https://github.com/chakra-ui/polymorphic/pull/327) [`b572666`](https://github.com/chakra-ui/polymorphic/commit/b5726663f25075bc1c50c87a9015b3611000fb54) Thanks [@TimKolberger](https://github.com/TimKolberger)! - When using the `as` prop, the `ref` will now be typed accordingly.

  **This is possibly a breaking change for TypeScript users.**

  ```tsx
  let ref: HTMLAnchorElement = undefined
  return <poly.button as="a" ref={ref} />
  ```

## 0.2.0

### Minor Changes

- [#192](https://github.com/chakra-ui/polymorphic/pull/192) [`bc0f72a`](https://github.com/chakra-ui/polymorphic/commit/bc0f72a00cf328b8e342576abdaa993bc5fc547c) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the factory options type `polymorphicFactory<P, Options>()` did not propagate
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

## 0.1.3

### Patch Changes

- [#108](https://github.com/chakra-ui/polymorphic/pull/108) [`b2659fc`](https://github.com/chakra-ui/polymorphic/commit/b2659fc7fee36098950d57d5687ed2648f3ff7be) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the ESM export was picked up as CJS.

## 0.1.2

### Patch Changes

- [#66](https://github.com/chakra-ui/polymorphic/pull/66) [`a1f86e3`](https://github.com/chakra-ui/polymorphic/commit/a1f86e3061036e9a4acbc1bd3eed4398b08f3365) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Added keywords to package.json

- [#68](https://github.com/chakra-ui/polymorphic/pull/68) [`38fc60e`](https://github.com/chakra-ui/polymorphic/commit/38fc60eca5647fcd61259f237f08da13ff241cee) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Refactored clean-package configuration.

## 0.1.1

### Patch Changes

- [#37](https://github.com/chakra-ui/polymorphic/pull/37) [`4b9afcd`](https://github.com/chakra-ui/polymorphic/commit/4b9afcd996e0c3977a2f62359c9b9ae34a1cb732) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the JSX was preserved in the build output.

## 0.1.0

### Minor Changes

- [#27](https://github.com/chakra-ui/polymorphic/pull/27) [`eb3d8a1`](https://github.com/chakra-ui/polymorphic/commit/eb3d8a1412fb4eaad5829e483a602589887c5bf2) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Initial release for solid-js.
