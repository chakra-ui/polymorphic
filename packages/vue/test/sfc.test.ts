import { describe, expect, it } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/vue'
import PolyTest from './poly-test.vue'

describe('SFC related features', () => {
  it('has default value with v-model', () => {
    render(PolyTest)

    const inputElement: HTMLInputElement = screen.getByTestId('poly-input')
    const divElement: any = screen.getByTestId('poly-div')

    expect(inputElement.value).toBe('test')
    // Div element should not have "value" bound to them
    expect(divElement.value).toBeUndefined()
    expect(divElement.modelvalue).toBeUndefined()
  })

  it('updates input with vmodel correctly', async () => {
    render(PolyTest)

    const inputElement: HTMLInputElement = screen.getByTestId('poly-input')

    await fireEvent.update(inputElement, 'Done')

    expect(inputElement.value).toBe('Done')
  })

  it('updates select correctly', async () => {
    render(PolyTest)

    const select = screen.getByTestId('poly-select')

    await fireEvent.change(select, { target: { value: 2 } })

    const options: HTMLOptionElement[] = screen.getAllByRole("option")

    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeTruthy()
    expect(options[2].selected).toBeFalsy()
  })

  it('updates radio correctly', async () => {
    render(PolyTest)

    const radio = screen.getByTestId('react-radio')

    await fireEvent.click(radio)

    screen.getByText("Radio: react")
  })

  it("updates multiple checkbox selection", async () => {
    render(PolyTest)

    const john = screen.getByTestId("checkbox-john")
    const jack = screen.getByTestId("checkbox-jack")

    await fireEvent.click(john)

    screen.getByText("checked : John")

    await fireEvent.click(jack)

    screen.getByText("checked : John,Jack")
  })

  it("updates single checkbox with boolean", async () => {
    render(PolyTest)

    const singleCheckbox = screen.getByTestId("single-checkbox")

    await fireEvent.click(singleCheckbox)

    screen.getByText("single checked : false")

    await fireEvent.click(singleCheckbox)

    screen.getByText("single checked : true")
  })
})
