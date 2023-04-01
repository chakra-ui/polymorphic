import { computed } from 'vue'

const formElements = ['input', 'select', 'textarea', 'fieldset', 'datalist', 'option', 'optgroup']

export const useVModel = (
  elementTag: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: any,
  emit: CallableFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs: any,
) => {
  let vmodelAttrs = {}
  const handleMultipleCheckbox = (value: unknown) => {
    const currentModelValue = [...modelValue]
    if (currentModelValue.includes(value)) {
      currentModelValue.splice(currentModelValue.indexOf(value), 1)
      return currentModelValue
    } else {
      return [...currentModelValue, value]
    }
  }
  const handleInput = (e: Event) => {
    emit(
      'update:modelValue',
      attrs.type === 'checkbox' && Array.isArray(modelValue)
        ? handleMultipleCheckbox((e?.currentTarget as HTMLInputElement)?.value)
        : typeof modelValue === 'boolean'
        ? (e?.currentTarget as HTMLInputElement)?.checked
        : (e?.currentTarget as HTMLInputElement)?.value,
    )
    emit('input', e, (e?.currentTarget as HTMLInputElement)?.value)
    emit(
      'change',
      e,
      typeof modelValue === 'boolean'
        ? (e?.currentTarget as HTMLInputElement)?.checked
        : (e?.currentTarget as HTMLInputElement)?.value,
    )
  }

  if (formElements.includes(elementTag)) {
    let val: Record<string, unknown> = { value: modelValue }
    if (elementTag === 'input' && (attrs.type === 'checkbox' || attrs.type === 'radio')) {
      const isChecked = computed(() =>
        typeof modelValue === 'boolean' ? modelValue : modelValue.includes(attrs.value),
      )
      val = {
        checked: isChecked.value,
      }
    }
    vmodelAttrs = {
      ...val,
      onInput: handleInput,
    }
  }

  return vmodelAttrs
}
