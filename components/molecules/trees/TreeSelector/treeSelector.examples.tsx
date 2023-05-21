/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { useState } from 'react'

import { Search } from '@easy-eva-icons/react'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FormProvider, useForm } from 'react-hook-form'

import { InputText } from 'components/atoms/inputs/InputText'

import { TreeSelector } from '.'
import { TreeSelectorNode } from './treeSelector.models'

// Constants
const { colors } = theme

const tree: TreeSelectorNode[] = [
  {
    id: 11,
    name: 'area1',
    displayName: 'Ciencias Naturales',
    disabled: false,
    status: 'unchecked',
    path: [],
    children: [
      {
        id: 21,
        name: 'topic1',
        displayName: 'Biología',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 31,
            name: 'application1',
            displayName: 'Aplicación 1',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 32,
            name: 'application2',
            displayName: 'Aplicación 2',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 33,
            name: 'application3',
            displayName: 'Aplicación 3',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
      {
        id: 22,
        name: 'topic2',
        displayName: 'Química',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 34,
            name: 'application4',
            displayName: 'Aplicación 4',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 35,
            name: 'application5',
            displayName: 'Aplicación 5',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 36,
            name: 'application6',
            displayName: 'Aplicación 6',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
      {
        id: 23,
        name: 'topic3',
        displayName: 'Física',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 37,
            name: 'application7',
            displayName: 'Aplicación 7',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 38,
            name: 'application8',
            displayName: 'Aplicación 8',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 39,
            name: 'application9',
            displayName: 'Aplicación 9',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'area2',
    displayName: 'Ciencias Sociales',
    disabled: false,
    status: 'unchecked',
    path: [],
    children: [
      {
        id: 24,
        name: 'topic4',
        displayName: 'Historia',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 40,
            name: 'application10',
            displayName: 'Aplicación 10',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 41,
            name: 'application11',
            displayName: 'Aplicación 11',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 42,
            name: 'application12',
            displayName: 'Aplicación 12',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
      {
        id: 25,
        name: 'topic5',
        displayName: 'Geografía',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 43,
            name: 'application13',
            displayName: 'Aplicación 13',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 44,
            name: 'application14',
            displayName: 'Aplicación 14',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 45,
            name: 'application15',
            displayName: 'Aplicación 15',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
      {
        id: 26,
        name: 'topic6',
        displayName: 'Economía',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 46,
            name: 'application16',
            displayName: 'Aplicación 16',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 47,
            name: 'application17',
            displayName: 'Aplicación 17',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 48,
            name: 'application18',
            displayName: 'Aplicación 18',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 13,
    name: 'area3',
    displayName: 'Matemáticas',
    disabled: false,
    status: 'unchecked',
    path: [],
    children: [
      {
        id: 27,
        name: 'topic7',
        displayName: 'Álgebra',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 49,
            name: 'application19',
            displayName: 'Aplicación 19',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 50,
            name: 'application20',
            displayName: 'Aplicación 20',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 51,
            name: 'application21',
            displayName: 'Aplicación 21',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
      {
        id: 28,
        name: 'topic8',
        displayName: 'Geometría',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 52,
            name: 'application22',
            displayName: 'Aplicación 22',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 53,
            name: 'application23',
            displayName: 'Aplicación 23',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 54,
            name: 'application24',
            displayName: 'Aplicación 24',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
      {
        id: 29,
        name: 'topic9',
        displayName: 'Trigonometría',
        disabled: false,
        status: 'unchecked',
        path: [],
        children: [
          {
            id: 55,
            name: 'application25',
            displayName: 'Aplicación 25',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 56,
            name: 'application26',
            displayName: 'Aplicación 26',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
          {
            id: 57,
            name: 'application27',
            displayName: 'Aplicación 27',
            disabled: false,
            status: 'unchecked',
            path: [],
            children: [],
          },
        ],
      },
    ],
  },
]

// Types
type Form = {
  search: string
  nodes: Omit<TreeSelectorNode, 'children'>[]
}

export const TreeSelectorExamples = () => {
  const [formData, setFormData] = useState<Form>()

  const methods = useForm<Form>({ defaultValues: { nodes: tree } })

  // Get data from one field
  const value = methods.watch('nodes')
  console.log({ inputValue: value })
  console.log({ formData })

  type MapNodesArgs = {
    name: string
    status: TreeSelectorNode['status']
    children?: MapNodesArgs[]
  }
  const mapNodes = (nodes: TreeSelectorNode[]): MapNodesArgs[] =>
    nodes.map((node) => ({
      name: node.name,
      status: node.status,
      children: node.children.length !== 0 ? mapNodes(node.children) : undefined,
    }))

  const nodes = (formData?.nodes ?? []) as TreeSelectorNode[]

  return (
    <>
      <Typography variant="h1" color={colors.neutrals[300]} weight="semibold">
        Formulario
      </Typography>

      <pre className="code">{JSON.stringify(mapNodes(nodes), null, 2)}</pre>

      <FormProvider {...methods}>
        <form className="form" onSubmit={(e) => void methods.handleSubmit(setFormData)(e)}>
          <InputText
            name="search"
            placeholder="Buscar"
            icon={<Search />}
            withAutocomplete={false}
          />

          <TreeSelector
            name="nodes"
            rules={{ required: true }}
            searchValue={methods.watch('search') ?? ''}
          />

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

        .code {
          padding: 1.5rem;
          margin: 1rem;
          background-color: ${colors.neutrals[100]};
          border-radius: 0.5rem;
          max-height: 20rem;
          overflow: auto;
        }
      `}</style>
    </>
  )
}
