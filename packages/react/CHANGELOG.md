# @polymorphic-factory/react

## 0.4.0

### Minor Changes

- [#327](https://github.com/chakra-ui/polymorphic/pull/327) [`b572666`](https://github.com/chakra-ui/polymorphic/commit/b5726663f25075bc1c50c87a9015b3611000fb54) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Removed the member `defaultProps` from the type `ComponentWithAs` to support React 18.3.0.

  **This is possibly a breaking change for TypeScript users.**

- [#327](https://github.com/chakra-ui/polymorphic/pull/327) [`b572666`](https://github.com/chakra-ui/polymorphic/commit/b5726663f25075bc1c50c87a9015b3611000fb54) Thanks [@TimKolberger](https://github.com/TimKolberger)! - When using the `as` prop, the `ref` will now be typed accordingly.

  **This is possibly a breaking change for TypeScript users.**

  ```tsx
  const ref = useRef<HTMLAnchorElement>(null)
  return <poly.button as="a" ref={ref} />
  ```

## 0.3.0

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

## 0.2.2

### Patch Changes

- [#108](https://github.com/chakra-ui/polymorphic/pull/108) [`b2659fc`](https://github.com/chakra-ui/polymorphic/commit/b2659fc7fee36098950d57d5687ed2648f3ff7be) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the ESM export was picked up as CJS.

## 0.2.1

### Patch Changes

- [#66](https://github.com/chakra-ui/polymorphic/pull/66) [`a1f86e3`](https://github.com/chakra-ui/polymorphic/commit/a1f86e3061036e9a4acbc1bd3eed4398b08f3365) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Added keywords to package.json

- [#68](https://github.com/chakra-ui/polymorphic/pull/68) [`38fc60e`](https://github.com/chakra-ui/polymorphic/commit/38fc60eca5647fcd61259f237f08da13ff241cee) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Refactored clean-package configuration.

## 0.2.0

### Minor Changes

- [#26](https://github.com/chakra-ui/polymorphic/pull/26) [`122b838`](https://github.com/chakra-ui/polymorphic/commit/122b838309c47312a4414cf3b9dc9da273a48aa4) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Declared bundle exports explicitly.

### Patch Changes

- [#26](https://github.com/chakra-ui/polymorphic/pull/26) [`122b838`](https://github.com/chakra-ui/polymorphic/commit/122b838309c47312a4414cf3b9dc9da273a48aa4) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where autocomplete for intrinsic element props did not show up.

## 0.1.2

### Patch Changes

- [#7](https://github.com/chakra-ui/polymorphic/pull/7) [`861edac`](https://github.com/chakra-ui/polymorphic/commit/861edac232bca7e0b528e2aafc60cab363506f1a) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Updated the repository path in package.json.

## 0.1.1

### Patch Changes

- [#5](https://github.com/chakra-ui/polymorphic/pull/5) [`9367d89`](https://github.com/chakra-ui/polymorphic/commit/9367d89b25d787e99c783792f631ac82687d51ed) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the bundle was shipped with preserved jsx. It is now compiled with `react-jsx`.

## 0.1.0

### Minor Changes

- [#3](https://github.com/chakra-ui/polymorphic/pull/3) [`8a1b3df`](https://github.com/chakra-ui/polymorphic/commit/8a1b3df45bdc25c5fb3dda42cb6c4a31234287b7) Thanks [@TimKolberger](https://github.com/TimKolberger)! - Initial release
