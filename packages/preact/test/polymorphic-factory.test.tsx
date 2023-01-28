import { render, screen } from '@testing-library/preact'
import { type HTMLPolymorphicProps, polymorphicFactory } from '../src'

describe('Polymorphic Factory', () => {
  describe('with default styled function', () => {
    const poly = polymorphicFactory()

    it('should render an element', () => {
      render(<poly.div data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('DIV')
    })

    it('should render an element with the as prop', () => {
      render(<poly.div data-testid="poly" as="main" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('MAIN')
    })

    it('should render an element with the factory', () => {
      const Aside = poly('aside')
      render(<Aside data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('ASIDE')
    })
  })

  describe('with custom styled function', () => {
    const customPoly = polymorphicFactory<Record<never, never>, { customOption: string }>({
      styled: (component, options) => (props) => {
        const Component = props.as || component
        return <Component data-custom-styled data-options={JSON.stringify(options)} {...props} />
      },
    })

    it('should render an element', () => {
      render(<customPoly.div data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('DIV')
      expect(element).toHaveAttribute('data-custom-styled', 'true')
    })

    it('should render an element with the as prop', () => {
      render(<customPoly.div data-testid="poly" as="main" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('MAIN')
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
