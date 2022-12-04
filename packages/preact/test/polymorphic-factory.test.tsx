// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from 'preact'
import { render, screen } from '@testing-library/preact'
import { polymorphicFactory } from '../src'

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
    const customPoly = polymorphicFactory({
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
})
