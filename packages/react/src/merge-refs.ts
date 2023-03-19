import type * as React from 'react'

export type SupportedRef<T = unknown> =
  | React.MutableRefObject<T>
  | React.LegacyRef<T>
  | null
  | undefined

export function mergeRefs<T = unknown>(refs: SupportedRef<T>[]): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    }
  }
}
