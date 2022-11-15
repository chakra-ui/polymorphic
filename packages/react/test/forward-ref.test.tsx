import { createRef } from 'react'
import type { HTMLPolymorphicProps } from '../src'
import { polymorphicFactory, forwardRef } from '../src'
import { render } from '@testing-library/react'

describe('forwardRef', () => {
  const poly = polymorphicFactory()

  it('should forward the ref', () => {
    const ComponentUnderTest = forwardRef<'div', HTMLPolymorphicProps<'div'>>((props, ref) => (
      <poly.div {...props} ref={ref} />
    ))

    const ref = createRef<HTMLDivElement>()
    render(<ComponentUnderTest ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should forward the ref with as prop', () => {
    const ComponentUnderTest = forwardRef<'div', HTMLPolymorphicProps<'div'>>((props, ref) => (
      <poly.div {...props} ref={ref} />
    ))

    // known issue: with the `as` prop refs are not inherited correctly
    // workaround:
    const ref = createRef<HTMLDivElement & HTMLFormElement>()
    render(<ComponentUnderTest as="form" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLFormElement)
  })
})
