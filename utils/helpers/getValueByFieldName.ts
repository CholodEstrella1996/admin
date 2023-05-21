type Primitive = string | number | boolean | null | undefined
type FormValues<T> = { [key: string]: FormValues<T> | Primitive }

export const getValueByFieldName = <T>(formValues: FormValues<T>, fieldName: string): T => {
  const fields = fieldName.split('.')
  const lastIndex = fields.length - 1
  const lastField = fields[lastIndex]

  const values = fields.reduce((accumulator, field, index) => {
    const isLastIndex = lastIndex === index
    if (isLastIndex) return accumulator

    if (field in accumulator) return accumulator[field] as FormValues<T>
    return accumulator
  }, formValues)

  return values[lastField] as unknown as T
}
