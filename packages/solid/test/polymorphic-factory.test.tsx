import { render, screen } from 'solid-testing-library'
import { polymorphicFactory } from '../src'
import { splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

describe('Polymorphic Factory', () => {
  describe('with default styled function', () => {
    const poly = polymorphicFactory()

    it('should render an element', () => {
      render(() => <poly.div data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('DIV')
    })

    it('should render an element with the as prop', () => {
      render(() => <poly.div data-testid="poly" as="main" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('MAIN')
    })

    it('should render an element with the factory', () => {
      const Aside = poly('aside')
      render(() => <Aside data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('ASIDE')
    })
  })

  describe('with custom styled function', () => {
    const customPoly = polymorphicFactory({
      styled: (originalComponent, options) => (props) => {
        const [local, others] = splitProps(props, ['as'])
        const component = local.as || originalComponent

        return (
          <Dynamic
            component={component}
            data-custom-styled
            data-options={JSON.stringify(options)}
            {...others}
          />
        )
      },
    })

    it('should render an element', () => {
      render(() => <customPoly.div data-testid="poly" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('DIV')
      expect(element).toHaveAttribute('data-custom-styled', 'true')
    })

    it('should render an element with the as prop', () => {
      render(() => <customPoly.div data-testid="poly" as="main" />)
      const element = screen.getByTestId('poly')
      expect(element.nodeName).toBe('MAIN')
    })

    it('should render an element with the custom factory', () => {
      const Aside = customPoly('aside')
      render(() => <Aside data-testid="custom-poly" />)
      const element = screen.getByTestId('custom-poly')
      expect(element.nodeName).toBe('ASIDE')
      expect(element).toHaveAttribute('data-custom-styled', 'true')
    })

    it('should render an element with styled options', () => {
      const options = { customOption: 'awesome' }
      const Aside = customPoly('aside', options)

      render(() => <Aside data-testid="custom-poly" />)

      const element = screen.getByTestId('custom-poly')
      expect(element.nodeName).toBe('ASIDE')
      expect(element).toHaveAttribute('data-custom-styled', 'true')
      expect(element).toHaveAttribute('data-options', JSON.stringify(options))
    })
  })
})
