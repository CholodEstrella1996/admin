import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

import { PackageForm } from 'components/molecules/forms/newAndEdit/Packages'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TabLanguage from 'components/molecules/TabLanguage/tabLanguage.component'
import { Translation } from 'services/models/customers/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'

import { SelectedProducts } from '../SelectedProducts/selectedProducts.component'
import { DetailsPackageGlobalStyles, DetailsPackageStyles } from './detailsPackage.styles'

type DetailsPackageProps = {
  storeData: {
    visible?: boolean
    price?: number
    iconUrl?: string
    name?: string
    idPackage: number
  }
  tabsData: Translation[]
  selectedProds: SubscriptionsResponse['getPackages']
}

const DetailsPackageComponent = ({ storeData, tabsData, selectedProds }: DetailsPackageProps) => {
  const [isOpenPackageEdit, setIsOpenPackageEdit] = useState(false)

  const router = useRouter()

  return (
    <>
      <div className="detailPackage__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton"
            onClick={() => setIsOpenPackageEdit(!isOpenPackageEdit)}>
            Editar
          </Button>

          <button type="button" onClick={() => router.back()} className="backArrow">
            <ArrowBackIcon sx={{ fontSize: 37 }} />
          </button>

          <Typography variant="s2" color={theme.colors.neutrals[400]} className="headerLabel">
            Paquete
          </Typography>

          <Typography variant="h5" color={theme.colors.primary[500]} weight="bold">
            {storeData.name}
          </Typography>
        </section>
        <DropDownCard1
          title="Administración del Store"
          colorTitle={theme.colors.primary[500]}
          isOpen>
          <StoreAdmin sectionDiponibility sectionIcon sectionPrice data={storeData} />
        </DropDownCard1>
        <DropDownCard1
          title="Información del paquete"
          colorTitle={theme.colors.primary[500]}
          isOpen>
          <TabLanguage
            variant="title-description-chip"
            titles={{
              name: 'Nombre del paquete',
              description: 'Descripción del paquete',
              attachChipFile: 'Palabras clave',
            }}
            apiData={tabsData}
          />
        </DropDownCard1>

        <div className="selected-products">
          <Typography variant="s1" color={theme.colors.primary[500]}>
            Productos seleccionados
          </Typography>
          {selectedProds && <SelectedProducts products={selectedProds} />}
        </div>
      </div>

      {isOpenPackageEdit && (
        <PackageForm
          isNewForm={false}
          onClose={() => setIsOpenPackageEdit(false)}
          idPackage={storeData.idPackage}
        />
      )}

      <style jsx>{DetailsPackageStyles}</style>
      <style jsx global>
        {DetailsPackageGlobalStyles}
      </style>
    </>
  )
}

export default DetailsPackageComponent
