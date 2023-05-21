/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useState } from 'react'

import { Globe2Outline } from '@easy-eva-icons/react'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { InputChip } from 'components/atoms/inputs/InputChip'
import { InputFile } from 'components/atoms/inputs/InputFile'
import { InputText } from 'components/atoms/inputs/InputText'
import { InputToggle } from 'components/atoms/inputs/InputToggle'

import { InputSelect, InputSelectProps } from '.'

// Constants
const { colors } = theme

const countries = [
  { id: 1, name: 'Argentina', displayName: 'El mejor país del mundo' },
  { id: 2, name: 'Brasil un poco larga para el ancho del select en mobile', disabled: false },
  { id: 3, name: 'Chile', disabled: true },
  { id: 4, name: 'Colombia' },
  { id: 5, name: 'Ecuador', disabled: true },
  { id: 6, name: 'Perú' },
  { id: 7, name: 'Uruguay' },
  { id: 8, name: 'Venezuela' },
]

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Williams', disabled: true },
  { id: 3, name: 'John Smith' },
  { id: 4, name: 'Jane Doe' },
]

const categories = [
  { id: 1, name: 'Aplicaciones' },
  { id: 2, name: 'Juegos' },
  { id: 3, name: 'Libros' },
  { id: 4, name: 'Música' },
  { id: 5, name: 'Películas' },
]

const subcategories = [
  { id: 1, name: 'Productividad', parentId: 1 },
  { id: 2, name: 'Educación', parentId: 1 },
  { id: 3, name: 'Entretenimiento', parentId: 1 },
  { id: 4, name: 'Acción', parentId: 2 },
  { id: 5, name: 'Aventura', parentId: 2 },
  { id: 6, name: 'MMO', parentId: 2 },
  { id: 7, name: 'Economía', parentId: 3 },
  { id: 8, name: 'Autoayuda', parentId: 3 },
  { id: 9, name: 'Ficción', parentId: 3 },
  { id: 10, name: 'Rock', parentId: 4 },
  { id: 11, name: 'Pop', parentId: 4 },
  { id: 12, name: 'Electrónica', parentId: 4 },
  { id: 13, name: 'Romántica', parentId: 5 },
  { id: 14, name: 'Drama', parentId: 5 },
  { id: 15, name: 'Comedia', parentId: 5 },
]

const elements = [
  { id: 1, name: 'Google Docs', parentId: 1 },
  { id: 2, name: 'Microsoft Word', parentId: 1 },
  { id: 3, name: 'Apple Pages', parentId: 1 },
  { id: 31, name: 'Google Sheets', parentId: 1 },
  { id: 32, name: 'Microsoft Excel', parentId: 1 },
  { id: 33, name: 'Apple Numbers', parentId: 1 },
  { id: 34, name: 'Google Slides', parentId: 1 },
  { id: 35, name: 'Microsoft PowerPoint', parentId: 1 },
  { id: 36, name: 'Apple Keynote', parentId: 1 },
  { id: 4, name: 'Folcademy', parentId: 2 },
  { id: 5, name: 'Coursera', parentId: 2 },
  { id: 6, name: 'Udemy', parentId: 2 },
  { id: 7, name: 'Netflix', parentId: 3 },
  { id: 8, name: 'Disney+', parentId: 3 },
  { id: 9, name: 'HBO', parentId: 3 },
  { id: 10, name: 'Call of Duty', parentId: 4 },
  { id: 11, name: 'Fortnite', parentId: 4 },
  { id: 12, name: 'Minecraft', parentId: 4 },
  { id: 13, name: 'The Witcher', parentId: 5 },
  { id: 14, name: 'Assassin’s Creed', parentId: 5 },
  { id: 15, name: 'God of War', parentId: 5 },
  { id: 16, name: 'The Lord of the Rings', parentId: 6 },
  { id: 17, name: 'Harry Potter', parentId: 6 },
  { id: 18, name: 'The Hunger Games', parentId: 6 },
  { id: 19, name: 'El Principito', parentId: 7 },
  { id: 20, name: 'El Alquimista', parentId: 7 },
  { id: 21, name: 'El Poder', parentId: 7 },
  { id: 22, name: 'The Beatles', parentId: 8 },
  { id: 23, name: 'Queen', parentId: 8 },
  { id: 24, name: 'Michael Jackson', parentId: 8 },
  { id: 25, name: 'Titanic', parentId: 9 },
  { id: 26, name: 'Avatar', parentId: 9 },
  { id: 27, name: 'Star Wars', parentId: 9 },
  { id: 28, name: 'La La Land', parentId: 10 },
  { id: 29, name: 'La Casa de Papel', parentId: 10 },
  { id: 30, name: 'The Walking Dead', parentId: 10 },
]

// Types
type Form = {
  countryFrom: InputSelectProps['options'][0]
  user: InputSelectProps['options'][0]
  countryTo: InputSelectProps['options'][0]
  multiple: {
    category: InputSelectProps['options'][0]
    subcategory: InputSelectProps['options'][0]
    element: InputSelectProps['options'][0]
  }
}

export const InputSelectExamples = () => {
  const [formData, setFormData] = useState<Form>()

  const methods = useForm<Form>({
    defaultValues: { user: users[2], countryFrom: { ...countries[1] } },
  })

  // Get data from one field
  const value = useWatch({ name: 'countryFrom', control: methods.control })
  console.log({ inputValue: value })
  console.log({ formData })

  return (
    <>
      <Typography variant="h1" color={colors.neutrals[300]} weight="semibold">
        Formulario
      </Typography>
      <Typography variant="p1">
        País de origen: {formData?.countryFrom?.name} <br />
        Usuario: {formData?.user?.name} <br />
        País de destino: {formData?.countryTo?.name} <br />
        Categoría: {formData?.multiple?.category?.name} <br />
        Subcategoría: {formData?.multiple?.subcategory?.name} <br />
        Elemento: {formData?.multiple?.element?.name} <br />
      </Typography>

      <FormProvider {...methods}>
        <form className="form" onSubmit={(e) => void methods.handleSubmit(setFormData)(e)}>
          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              required - small
            </Typography>

            <InputSelect
              name="countryFrom"
              rules={{ required: true }}
              label="País de Origen"
              placeholder="Ingresa un país"
              options={countries}
              size="small"
              withClear
            />
          </div>

          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              withDefaultValue - medium
            </Typography>

            <InputSelect
              name="user"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              options={users}
              rules={{ required: true }}
              size="medium"
            />
          </div>

          <div style={{ display: 'flex', background: '#eee' /* flexWrap: 'wrap' */ }}>
            <InputSelect
              name="user"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              options={users}
              rules={{ required: true }}
              size="small"
              withClear
            />

            <InputText
              name="user1"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              rules={{ required: true }}
              size="small"
              withClear
            />
          </div>

          <div style={{ display: 'flex', background: '#eee' /* flexWrap: 'wrap' */ }}>
            <InputSelect
              name="user"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              options={users}
              rules={{ required: true }}
              size="medium"
              withClear
            />

            <InputText
              name="user1"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              rules={{ required: true }}
              size="medium"
              withClear
            />
          </div>

          <div style={{ display: 'flex', background: '#eee' /* flexWrap: 'wrap' */ }}>
            <InputSelect
              name="user"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              options={users}
              rules={{ required: true }}
              size="large"
              withClear
            />

            <InputText
              name="user1"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              rules={{ required: true }}
              size="large"
              withClear
            />
          </div>

          <div style={{ display: 'flex', background: '#eee' /* flexWrap: 'wrap' */ }}>
            <InputSelect
              name="user"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              options={users}
              rules={{ required: true }}
              size="large"
              withClear
            />

            <InputText
              name="user1"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              rules={{ required: true }}
              size="large"
              withClear
            />

            <InputChip
              name="user2"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              rules={{ required: true }}
            />

            <InputFile name="user3" label="Usuario" rules={{ required: true }} />

            <InputToggle
              name="user4"
              label="Usuario"
              title="Ingresa un nombre de usuario"
              rules={{ required: true }}
            />
          </div>

          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              disabled - withIcon - large
            </Typography>

            <InputSelect
              name="countryTo"
              rules={{ disabled: true }}
              label="País de Destino"
              placeholder="Ingresa un país"
              options={countries}
              icon={<Globe2Outline />}
              size="large"
            />
          </div>

          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              Multiple
            </Typography>

            <InputSelect
              name="multiple.category"
              label="Categoría"
              placeholder="Ingresa una categoría"
              options={categories}
              withSearch
              icon={<Globe2Outline />}
              rules={{ required: true }}
            />

            <InputSelect
              name="multiple.subcategory"
              label="Subcategoría"
              placeholder="Ingresa una subcategoría"
              options={subcategories.filter(
                ({ parentId }) => parentId === methods.watch('multiple.category')?.id,
              )}
            />

            <InputSelect
              name="multiple.element"
              label="Elemento"
              placeholder="Ingresa un elemento"
              options={elements.filter(
                ({ parentId }) => parentId === methods.watch('multiple.subcategory')?.id,
              )}
            />
          </div>

          <button type="submit">Send</button>
        </form>
      </FormProvider>

      <style jsx>{`
        .form {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 1rem;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-bottom: 1rem;
        }
      `}</style>
    </>
  )
}
