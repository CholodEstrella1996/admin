/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react'

import { InputSearch } from '@folcode/clabs.atoms.input-search'
import { Divider } from '@mui/material'

import { learningUnitsService } from 'services/modules/learningUnits.module'
import { Content } from 'utils/models/modelsBase'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import CheckResults from './component/checkResults.component'
import SelectedItems from './component/selectedItems.component'
import { LearningUnitFormStyles } from './learningUnitForm.styles'

type LearninUnitFormProps = {
  apiData?: Content[]

  onUpdate: (value: Content[]) => unknown
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const LearningUnitForm = ({ apiData, onUpdate, formLoadProps }: LearninUnitFormProps) => {
  const [stateInputSearch, stateSetInputSearch] = useState({ value: '', count: 0 })
  const [searchResultsApi, setSearchResultsApi] = useState<Content[]>(apiData ?? [])
  const [selectedItems, setSelectedItems] = useState<Content[]>([])

  useEffect(() => {
    onUpdate(selectedItems)
  }, [selectedItems])

  const searchApi = async (input: string) => {
    const results = await learningUnitsService.getApplications(input)
    return results.data.content
  }

  const onSearch = async (input: string) => {
    stateSetInputSearch({ value: input, count: stateInputSearch.count + 1 })
    if (stateInputSearch.count > 1) {
      const respSerch = await searchApi(input)
      setSearchResultsApi(respSerch)
    }
  }

  const handleOnChange = (item: Content) => {
    const findedElements = selectedItems.some((n) => n.id === item.id)
    if (!findedElements) setSelectedItems((prevState) => [...prevState, item])
  }

  const handleOnRemove = (idToRemove: number) => {
    const findedElements = selectedItems.filter((n) => n.id !== idToRemove)
    if (findedElements) setSelectedItems(findedElements)
  }

  const LearningUnitFormContent = (
    <>
      <div className="learningUnit__container">
        <section className="search__container">
          <InputSearch
            // TODO: Solucionar parametro onChange para que devuelva un string
            onChange={(event) => onSearch((event.target as unknown as { value: string }).value)}
            placeholder="Buscar por nombre"
          />

          {!!selectedItems.length && (
            <>
              <SelectedItems items={selectedItems} onRemove={(item) => handleOnRemove(item)} />
              <Divider flexItem />
            </>
          )}

          {searchResultsApi.length > 0 && (
            <CheckResults options={searchResultsApi} onChange={(item) => handleOnChange(item)} />
          )}
        </section>
      </div>
      <style jsx>{LearningUnitFormStyles}</style>
    </>
  )

  const step = [{ id: 1, element: LearningUnitFormContent }]

  return <FormLoad steps={step} {...formLoadProps} />
}

export default LearningUnitForm
