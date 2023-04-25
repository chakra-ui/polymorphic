import { computed, ref } from 'vue'

const formElements = ['input', 'select', 'textarea', 'fieldset', 'datalist', 'option', 'optgroup']

function handleMultipleCheckbox<TModelValue extends Array<any>>(
  value: unknown,
  modelValue: TModelValue,
) {
  const currentModelValue = [...modelValue]
  // If the value is already checked, uncheck it
  // else, add it to the checked array.
  if (currentModelValue.includes(value)) {
    currentModelValue.splice(currentModelValue.indexOf(value), 1)
    return currentModelValue
  } else {
    return [...currentModelValue, value]
  }
}

/**
 * Function that emits the right events when using v-model.
 */
function handleInput<
  TEmit extends CallableFunction,
  TModelValue extends Array<any>,
  TAttrs extends Record<string, unknown>,
>(e: Event, emit: TEmit, modelValue: TModelValue, attrs: TAttrs) {
  emit(
    'update:modelValue',
    attrs.type === 'checkbox' && Array.isArray(modelValue)
      ? handleMultipleCheckbox((e?.currentTarget as HTMLInputElement)?.value, modelValue)
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

export function getAttributes<
  TModelValue extends Array<any>,
  TEmit extends CallableFunction,
  TAttrs extends Record<string, unknown>,
>(elementTag: string, modelValue: TModelValue, emit: TEmit, attrs: TAttrs) {
  const val = ref<Record<string, unknown>>({ value: modelValue })
  const attributes = ref({ ...attrs })

  // Only do this if v-model directive is provided, otherwise return user props
  if (formElements.includes(elementTag) && (modelValue !== null || modelValue !== undefined)) {
    if (elementTag === 'input' && (attrs.type === 'checkbox' || attrs.type === 'radio')) {
      const isChecked = computed(() =>
        // If it's a boolean, it's probably a single checkbox or a radio button
        // If it's not, it's multiple checkboxes
        typeof modelValue === 'boolean' ? modelValue : modelValue.includes(attrs.value),
      )

      val.value = {
        checked: isChecked.value,
      }
    }

    attributes.value = {
      ...val.value,
      onInput: (e: Event) => handleInput(e, emit, modelValue, attrs),
      ...attrs,
    }
  }

  return attributes.value
}
