type FormValues = { [key: string]: FormValues | unknown }

type Args = {
  formFields: FormValues
  levels?: number
  prevValue?: string
}

export const getFieldNamesByFormData = ({ formFields, levels, prevValue = '' }: Args): string[] => {
  const fieldNames = Object.entries(formFields).flatMap(([key, value]) => {
    const newValue = prevValue === '' ? key : `${prevValue}.${key}`

    const isObject = value !== null && typeof value === 'object'
    if (!isObject) return newValue

    const nextLevel = levels === undefined ? 1 : levels - 1
    if (nextLevel === 0) return newValue

    return getFieldNamesByFormData({
      formFields: value as FormValues,
      levels: nextLevel,
      prevValue: newValue,
    })
  })

  return fieldNames
}
