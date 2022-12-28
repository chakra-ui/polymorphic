import React, { createRef } from 'react'
import { forwardRef, polymorphicFactory } from '../src'
import { render } from '@testing-library/react'

describe('forwardRef', () => {
  const poly = polymorphicFactory()

  it('should forward the ref', () => {
    const ComponentUnderTest = forwardRef<'div'>((props, ref) => <poly.div {...props} ref={ref} />)

    const ref = createRef<HTMLDivElement>()
    render(<ComponentUnderTest ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should forward the ref with `as` prop', () => {
    const ComponentUnderTest = forwardRef<'div'>((props, ref) => <poly.div {...props} ref={ref} />)

    const ref = createRef<HTMLFormElement>()
    render(<ComponentUnderTest as="form" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLFormElement)
  })

  it('should forward the ref with a custom component with `as` prop', () => {
    const ComponentUnderTest = forwardRef<'div'>((props, ref) => <poly.div {...props} ref={ref} />)
    const FormComponent = forwardRef<'form'>((props, ref) => <form {...props} ref={ref} />)

    const ref = createRef<HTMLFormElement>()
    render(<ComponentUnderTest as={FormComponent} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLFormElement)
  })

  it('should have correct typings for event callbacks', () => {
    const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      alert(e.currentTarget.nodeName)
    }
    render(
      <>
        <poly.button as="a" onClick={onAnchorClick} />
        <poly.button
          as="a"
          onClick={(e) => {
            // with implicit typings
            alert(e.currentTarget.nodeName)
          }}
        />
        <poly.button
          onClick={(e) => {
            // with implicit typings
            alert(e.currentTarget.nodeName)
          }}
        />
        ,
      </>,
    )
  })

  it('should override duplicate prop declarations ', () => {
    const ComponentUnderTest = forwardRef<'button'>((props, ref) => (
      <poly.button {...props} ref={ref} />
    ))

    // this component has a different definition for the "className" prop than <poly.button />
    const RouterLink = (props: { className: ((isActive: boolean) => string) | string }) => {
      const isActive = true
      const className =
        typeof props.className === 'function' ? props.className(isActive) : props.className
      return <a {...props} className={className} />
    }

    render(
      <>
        <ComponentUnderTest
          as={RouterLink}
          className={(isActive: boolean) => (isActive ? 'active' : 'default')}
        />
        <ComponentUnderTest as={RouterLink} className="default" />
      </>,
    )
  })

  it('should handle custom props with highest priority', () => {
    // `size` is a prop of `React.InputHTMLAttributes<T>` and is of type `number`, we are overriding it with a string
    const ComponentUnderTest = forwardRef<
      'input',
      { size: 'sm' | 'md' | 'lg'; variant: 'outline' | 'solid' }
    >((props, ref) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { size, ...rest } = props
      return <poly.input {...rest} ref={ref} />
    })

    render(<ComponentUnderTest size="sm" variant="outline" disabled />)
    render(<poly.input as={ComponentUnderTest} size="sm" variant="solid" disabled />)

    // @ts-expect-error missing size and variant props
    render(<poly.input as={ComponentUnderTest} />)
  })

  it('should not allow props outside the prop interface', () => {
    const ComponentUnderTest = forwardRef<'input'>((props, ref) => <input {...props} ref={ref} />)

    // @ts-expect-error nonExistentProp is not a valid prop
    render(<ComponentUnderTest nonExistentProp="should error" />)

    // @ts-expect-error nonExistentProp is not a valid prop
    render(<poly.input nonExistentProp="should error" />)
  })
})
