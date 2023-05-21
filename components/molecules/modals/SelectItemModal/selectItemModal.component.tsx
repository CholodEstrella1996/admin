import { ChangeEventHandler } from 'react'

import { InputSearch } from '@folcode/clabs.atoms.input-search'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import Spinner from 'components/atoms/Spinner'
import { TextIcon } from 'components/atoms/TextIcon'
import { FormLoad, FormLoadProps } from 'components/molecules/forms/components/FormLoad'

import { SelectItemModalModel } from './selectItemModal.models'
import { SelectItemModalLocalStyles } from './selectItemModal.styles'

const { colors } = theme

export type SelectItemModalComponentProps = {
  loading: boolean
  categories: SelectItemModalModel['category'][]

  onClickItem: (id: number) => unknown
  onSearch: ChangeEventHandler<HTMLInputElement>

  formLoadProps: Pick<FormLoadProps, 'title' | 'onClose' | 'onSubmit'>
}

export const SelectItemModalComponent = (props: SelectItemModalComponentProps) => {
  // Props
  const {
    loading,
    categories,

    onClickItem,
    onSearch,

    formLoadProps,
  } = props

  // Render
  const Content = (
    <div className="main-container">
      <InputSearch onChange={onSearch} placeholder="Buscar por nombre" />

      <section className="search-results">
        {!loading ? (
          <ul className="categories">
            {categories.length ? (
              categories.map(({ name: categoryName, subcategories }) => (
                <li className="category" key={categoryName}>
                  <Typography variant="s1" color={colors.neutrals[400]}>
                    {categoryName}
                  </Typography>

                  <ul className="subcategories">
                    {subcategories.map(({ name: subcategoryName, items }) => (
                      <li className="subcategory" key={subcategoryName}>
                        <Typography variant="s2" color={colors.neutrals[400]}>
                          {subcategoryName}
                        </Typography>

                        <ul className="items">
                          {items.map(({ id, iconUrl, name, selected }) => (
                            <li className="item" key={id}>
                              <TextIcon
                                size="medium"
                                icon={iconUrl ?? undefined}
                                text={name}
                                id={id.toString()}
                                selected={selected}
                                onClick={() => onClickItem(id)}
                              />
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <Typography variant="s1" color={colors.neutrals[400]}>
                No se encontraron resultados
              </Typography>
            )}
          </ul>
        ) : (
          <Spinner />
        )}
      </section>

      <style jsx>{SelectItemModalLocalStyles}</style>
    </div>
  )

  return (
    <FormLoad
      steps={[{ id: 1, element: Content }]}
      finishButtonText="Confirmar"
      loading={false}
      {...formLoadProps}
    />
  )
}
