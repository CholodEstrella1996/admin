/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'
import { InputChip } from 'components/atoms/inputs/InputChip'
import { InputFile } from 'components/atoms/inputs/InputFile'
import { InputText } from 'components/atoms/inputs/InputText'
import { TextEditor } from 'components/atoms/TextEditor'
import { convertLanguageCode } from 'utils/helpers/convertLanguageCode'
import { getFieldNamesByFormData } from 'utils/helpers/getFieldNamesByFormData'

import { LanguageTab } from '../LanguageTab'

type Language = {
  name: string
  code: string
}

type Input = {
  name: (languageCode: string) => string
  type: 'title' | 'description' | 'keywords' | 'associatedFile' | 'textEditor'
  rules?: InputGeneralProps['rules']
  label?: string
  element?: ReactNode
}

export type LanguageTabsComponentProps = {
  inputs: Input[]
  languages?: Language[]

  fullWidth?: boolean
}

export const LanguageTabsComponent = (props: LanguageTabsComponentProps) => {
  // Props
  const {
    languages: languagesProp = [
      { name: 'English', code: 'en-US' },
      { name: 'Español', code: 'es-MX' },
      { name: 'Português', code: 'pt' },
      { name: 'Türkiye', code: 'tr' },
    ],
    inputs,
    fullWidth = true,
  } = props

  // Hooks
  const {
    formState: { errors },
  } = useFormContext()

  // States
  const [currentIndex, setCurrentIndex] = useState(0)

  const [languages, setLanguages] = useState<Language[]>([])

  // Data
  const title = inputs.find((input) => input.type === 'title')
  const description = inputs.find((input) => input.type === 'description')
  const keywords = inputs.find((input) => input.type === 'keywords')
  const associatedFile = inputs.find((input) => input.type === 'associatedFile')
  const textEditor = inputs.find((input) => input.type === 'textEditor')

  // Exceptions
  const areDuplicatedByType = inputs.length !== new Set(inputs.map((input) => input.type)).size
  const areDuplicatedByName = inputs.length !== new Set(inputs.map((input) => input.name)).size

  if (areDuplicatedByType) throw new Error('Inputs must be unique by type')
  if (areDuplicatedByName) throw new Error('Inputs must be unique by name')

  // Methods
  const getLanguagesWithErrors = () => {
    const fieldsWithErrors = getFieldNamesByFormData({ formFields: errors, levels: 3 })

    const checkHasError = (language: string) =>
      fieldsWithErrors.some((field) => field.includes(language))

    const languagesWithErrors = languages.map((language, index) => ({
      id: index,
      name: language.name,
      hasError: checkHasError(language.code),
    }))

    return languagesWithErrors
  }

  // Effects
  useEffect(() => {
    const convertedLanguages = languagesProp.map((language) => ({
      ...language,
      code: convertLanguageCode(language.code),
    }))

    const isEqualToPrevState = JSON.stringify(languages) === JSON.stringify(convertedLanguages)
    if (isEqualToPrevState) return

    setLanguages(convertedLanguages)
  }, [languagesProp])

  // Render
  return (
    <section className="container">
      <LanguageTab
        currentIndex={currentIndex}
        onTabChange={setCurrentIndex}
        languages={getLanguagesWithErrors()}
      />

      <div className="contents">
        {languages.map(({ code }, index) => (
          <div
            key={code}
            className={textEditor ? 'editor' : 'content'}
            style={{ display: index !== currentIndex ? 'none' : 'flex' }}>
            {title &&
              (title.element || (
                <InputText
                  name={title.name(code)}
                  label={title.label ?? 'Nombre'}
                  rules={title.rules}
                />
              ))}

            {description &&
              (description.element || (
                <InputText
                  name={description.name(code)}
                  label={description.label ?? 'Descripción'}
                  multiline
                  rows={10}
                  cols={50}
                  rules={{ maxLength: 1000, ...description.rules }}
                />
              ))}

            {keywords &&
              (keywords.element || (
                <InputChip
                  name={keywords.name(code)}
                  label={keywords.label ?? 'Palabras Clave'}
                  placeholder="Ingresa palabras clave"
                  maxSelectedOptions={10}
                />
              ))}

            {associatedFile &&
              (associatedFile.element || (
                <InputFile
                  name={associatedFile.name(code)}
                  label={associatedFile.label ?? 'Archivo asociado'}
                  rules={associatedFile.rules}
                  accept="image/*"
                  withLeftSpacing
                />
              ))}

            {textEditor &&
              (textEditor.element || <TextEditor languageCode={textEditor.name(code)} />)}
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: ${fullWidth ? '100%' : '60%'};
        }

        .contents {
          display: flex;
          gap: 1rem;
          padding-block: 0.5rem;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
          width: 100%;
        }
        .editor {
          padding-block: 1rem;
          display: flex;
          flex-direction: column;
          width: 100%;
          padding-right: 1rem;
        }
      `}</style>
    </section>
  )
}
