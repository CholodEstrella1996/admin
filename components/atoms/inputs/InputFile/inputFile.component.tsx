/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useId, useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import { useFormContext } from 'react-hook-form'

import { InputBase } from 'components/atoms/inputs/InputBase'
import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'
import { getLastFragmentByUrl } from 'utils/helpers/getLastFragmentByUrl'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import FileList from './components/fileList.component'
import { inputFileLocalStyles } from './inputFile.styles'

export type InputFileComponentProps = InputGeneralProps & {
  size?: 'small' | 'medium' | 'large'
  buttonText?: string

  maxUploads?: number
  accept?: string
}

export const InputFileComponent = (props: InputFileComponentProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules: rulesProp = { required: false, disabled: false },
    className = '',

    label,
    labelAsUppercase = true,

    withLeftSpacing = false,

    size = 'small',
    buttonText = 'Examinar',

    maxUploads = 1,
    accept,
  } = props
  const { required } = rulesProp

  // Hooks
  const inputId = useId()

  const { register, setValue, watch } = useFormContext()

  // States
  const [files, setFiles] = useState<RFile[]>([])

  // Data
  const watchedValue = watch(name) as RFile[] | undefined
  const rules = { ...rulesProp, required: required && files.length === 0 }

  // Handlers
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = event.currentTarget?.files
    if (!targetFiles) return

    const iconUrl = URL.createObjectURL(targetFiles[0])
    const fileToUpload = targetFiles[0]

    const file = {
      id: getLastFragmentByUrl(iconUrl) ?? fileToUpload.name,
      name: fileToUpload.name,
      data: fileToUpload,
      url: iconUrl,
    }

    const newValue = [...files, file]

    setValue(name, newValue)
    setFiles(newValue)
  }

  const handleDelete = (selectedIndex: number) => {
    const filteredFiles = files.filter((_, index) => index !== selectedIndex)

    setValue(name, filteredFiles)
    setFiles(filteredFiles)
  }

  // Effects
  useEffect(() => {
    if (!watchedValue) return
    if (watchedValue instanceof FileList) {
      setValue(name, files)
      return
    }

    setFiles(watchedValue)
  }, [watchedValue])

  // Base Props
  const inputBaseProps = {
    id: idProp ?? inputId,
    name,
    rules: { ...rules, required },
    label,
    labelAsUppercase,
    className,
    withLeftSpacing,
  }

  // Render
  return (
    <InputBase {...inputBaseProps}>
      <div className={`input-file ${withLeftSpacing ? 'with-left-spacing' : ''}`}>
        <FileList files={files} onDelete={handleDelete} />

        {files.length < maxUploads && (
          <div className="add-file-button">
            <label htmlFor={idProp ?? inputId} className="button">
              <Typography
                variant={size === 'large' ? 'h6' : 's2'}
                weight={size === 'large' ? 'bold' : 'semibold'}
                className={`button--${size}`}>
                {buttonText}
              </Typography>
            </label>

            <input
              id={idProp ?? inputId}
              type="file"
              accept={accept}
              {...register(name, rules)}
              onChange={(e) => void handleChange(e)}
              className="input"
            />
          </div>
        )}
      </div>

      <style jsx>{inputFileLocalStyles}</style>
    </InputBase>
  )
}
