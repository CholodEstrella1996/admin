const downloadBlob = (blob: Blob, filename: string, extension: string) => {
  const a = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = `${filename}.${extension}`
  a.click()
}

export { downloadBlob }
