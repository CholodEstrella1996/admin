/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { Controller, useFormContext } from 'react-hook-form'

import 'react-quill/dist/quill.snow.css'
import { LanguageTypes } from 'components/molecules/forms/newAndEdit/Application/application.models'
import { FieldsTermsCondition } from 'components/molecules/FormTermsConditions/formTermsConditions.service'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ],
}

type TermsConditionsProps = {
  languageCode: string
}

export const TextEditorComponent = (props: TermsConditionsProps) => {
  const { control, watch } = useFormContext()

  const [defaultValues, setDefaultValues] =
    useState<Omit<FieldsTermsCondition, 'termsCondTitle' | 'termsCondVersion'>>()

  const { languageCode } = props

  useEffect(() => {
    const { termsCondTitle, termsCondVersion, ...rest } = watch()
    setDefaultValues({ ...(rest as { [key in LanguageTypes]: string }) })
  }, [])

  return defaultValues ? (
    <>
      <Controller
        control={control}
        name={languageCode}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <ReactQuill
            theme="snow"
            modules={modules}
            onChange={onChange}
            defaultValue={defaultValues[languageCode as LanguageTypes]}
          />
        )}
      />

      <style jsx global>{`
        .ql-editor.ql-blank {
          border-radius: 1.5rem;
          min-height: 14rem;
        }
        .ql-editor {
          border-radius: 0rem 0rem 1.5rem 1.5rem;
          min-height: 14rem;
          max-width: 40rem;
        }
        .ql-toolbar.ql-snow {
          border-radius: 1.5rem 1.5rem 0rem 0rem;
        }
        .ql-container.ql-snow {
          border-radius: 0rem 0rem 1.5rem 1.5rem;
        }
      `}</style>
    </>
  ) : null
}

export default TextEditorComponent
