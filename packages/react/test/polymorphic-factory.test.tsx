import { render, screen } from '@testing-library/react'
import { HTMLPolymorphicProps, polymorphicFactory } from '../src'
import { createRef } from 'react'

describe('Polymorphic Factory', () => {
  describe('with default styled function', () => {
    const poly = polymorphicFactory()

    it('should render an element', () => {
      render(<poly.div data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('DIV')
    })

    it('should render an element with the as prop', () => {
      render(
        <poly.div data-testid="poly" asChild>
          <main />
        </poly.div>,
      )
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('MAIN')
    })

    it('should render an element with the factory', () => {
      const Aside = poly('aside')
      render(<Aside data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('ASIDE')
    })

    it('should forward the ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<poly.div data-testid="poly" ref={ref} />)
      const element = screen.getByTestId('poly')
      expect(ref.current).toBe(element)
    })

    it('should forward the ref with asChild prop', () => {
      const divRef = createRef<HTMLDivElement>()
      const mainRef = createRef<HTMLDivElement>()
      render(
        <poly.div data-testid="poly" asChild ref={divRef}>
          <main ref={mainRef} />
        </poly.div>,
      )
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('MAIN')

      expect(divRef.current).toBe(element)
      expect(mainRef.current).toBe(element)
    })

    it('should not override a ref on the child element', () => {
      const mainRef = createRef<HTMLDivElement>()
      render(
        <poly.div data-testid="poly" asChild>
          <main ref={mainRef} />
        </poly.div>,
      )
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('MAIN')

      expect(mainRef.current).toBe(element)
    })
  })

  describe('with custom styled function', () => {
    const customPoly = polymorphicFactory<Record<never, never>, { customOption?: string }>({
      render: (Component, options) => (props) => {
        return <Component data-custom-styled data-options={JSON.stringify(options)} {...props} />
      },
    })

    it('should render an element', () => {
      render(<customPoly.div data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('DIV')
      expect(element).toHaveAttribute('data-custom-styled', 'true')
    })

    it('should render an element with the custom factory', () => {
      const Aside = customPoly('aside')
      render(<Aside data-testid="custom-poly" />)
      const element = screen.getByTestId('custom-poly')
      expect(element.nodeName).toBe('ASIDE')
      expect(element).toHaveAttribute('data-custom-styled', 'true')
    })

    it('should render an element with styled options', () => {
      const options = { customOption: 'awesome' }
      const Aside = customPoly('aside', options)

      render(<Aside data-testid="custom-poly" />)

      const element = screen.getByTestId('custom-poly')
      expect(element.nodeName).toBe('ASIDE')
      expect(element).toHaveAttribute('data-custom-styled', 'true')
      expect(element).toHaveAttribute('data-options', JSON.stringify(options))
    })
  })

  describe('with custom component', () => {
    const poly = polymorphicFactory()

    type CustomProps = HTMLPolymorphicProps<'div'> & { customProp: 'a' | 'b' | 'c' }
    const CustomComponent = poly((props: CustomProps) => {
      const { customProp, ...divProps } = props
      return <div {...divProps} data-custom={customProp} />
    })

    it('should inherit the props of a custom component', () => {
      render(<CustomComponent data-testid="poly" customProp="a" />)
      const element = screen.getByTestId('poly')
      expect(element).toHaveAttribute('data-custom', 'a')
    })

    it('should expect required props', () => {
      // @ts-expect-error Property 'customProp' is missing
      render(<CustomComponent />)
    })
  })
})
