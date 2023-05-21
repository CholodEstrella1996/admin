import axios, { AxiosRequestConfig } from 'axios'
import mime from 'mime'

import { RFile } from 'utils/models/reactFormFieldsTabs'

import { getLastFragmentByUrl } from './getLastFragmentByUrl'

type Resource = {
  url: string

  id?: string
  type?: string
}

const fallbackId = Math.random().toString(36).substring(2, 15)

export const convertResourceToFile = async (resource: Resource): Promise<RFile[]> => {
  // Download the resource
  const resourceUrl = `${resource.url}?not-from-cache-please`
  const options: AxiosRequestConfig = { responseType: 'blob' }
  const { data: blobResponse } = await axios.get<Blob>(resourceUrl, options)

  // Get metadata from the resource
  const id = resource.id ?? (getLastFragmentByUrl(resource.url) || fallbackId)
  const name = getLastFragmentByUrl(resource.url)
  const url = URL.createObjectURL(blobResponse)
  const type = resource.type ?? (mime.getType(resource.url) || 'application/octet-stream')

  if (!name) return []

  // Convert the resource to a file
  const data = new File([blobResponse], name, { type })

  return [{ id, name, data, url }]
}
