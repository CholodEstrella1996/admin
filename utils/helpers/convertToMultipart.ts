import { RFile } from 'utils/models/reactFormFieldsTabs'

type Body = {
  [key: string]: RFile[] | { [key: string]: unknown }
}

const convertToMultipart = (body: Body) => {
  const formData = new FormData()

  Object.entries(body).forEach(([key, value]) => {
    const containsFile = Array.isArray(value) && value.every((item) => item?.data instanceof File)

    if (containsFile) {
      const file = value[0]?.data
      if (!file) return

      formData.append(key, file)
    } else {
      const stringifiedData = new Blob([JSON.stringify(value)], { type: 'application/json' })

      formData.append(key, stringifiedData)
    }
  })

  return formData
}

export default convertToMultipart
