/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'

import FormNewEditTopic from 'components/molecules/FormNewEditTopic'
import { ApplicationForm } from 'components/molecules/forms/newAndEdit/Application'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TabLanguage from 'components/molecules/TabLanguage/tabLanguage.component'

import TableTitle1 from '../../molecules/TableTitle1'
import { DetailTopicProps } from './detailsTopic.model'
import { DetailsTopicStyles, DetailsTopicGlobalStyles } from './detailsTopic.styles'

const DetailsTopicComponent = ({
  storeName,
  storeTopic,
  dataApplications,
  dataTabs,
  subtitleApps,
  onDetailApplication,
  onDeleteApplication,
  pageChange,
  rowsPaginationChange,
  idTopic,
}: DetailTopicProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewForm, setIsNewForm] = useState(false)
  const [idApplication, setIdApplication] = useState(0)

  const [isOpenTopicEdit, setIsOpenTopicEdit] = useState(false)

  const onAddApplication = () => {
    setIsOpen(true)
    setIsNewForm(true)
  }

  const onEditApplication = (id: number) => {
    setIsOpen(true)
    setIsNewForm(false)
    setIdApplication(id)
  }

  return (
    <>
      <div className="detailTopic__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton"
            onClick={() => setIsOpenTopicEdit(!isOpenTopicEdit)}>
            Editar
          </Button>
          <Typography variant="s2" color={theme.colors.neutrals[400]} className="headerLabel">
            Temática
          </Typography>

          <Typography variant="h5" color={theme.colors.primary[500]} weight="bold">
            {storeName}
          </Typography>
        </section>

        <DropDownCard1
          title="Administración del Store"
          colorTitle={theme.colors.primary[500]}
          isOpen>
          <StoreAdmin sectionDiponibility sectionIcon sectionPrice data={storeTopic} />
        </DropDownCard1>

        <DropDownCard1
          title="Información de la Temática"
          colorTitle={theme.colors.primary[500]}
          isOpen>
          <TabLanguage
            variant="title-description-chip"
            titles={{
              name: 'Nombre de la temática',
              description: 'Descripción de la temática',
              attachChipFile: 'Palabras clave',
            }}
            apiData={dataTabs}
          />
        </DropDownCard1>

        <TableTitle1
          title="Aplicaciones"
          subtitle={subtitleApps}
          buttonText="Agregar nueva aplicación"
          onClick={onAddApplication}
          content={dataApplications}
          onDelete={(id) => onDeleteApplication(id)}
          onDetails={(id) => onDetailApplication(id)}
          columns={[
            { id: 'iconUrl', label: '', width: '5%' },
            { id: 'name', label: 'Nombre', width: '20%' },
            { id: 'description', label: 'Descripción', width: '65%' },
          ]}
          onEdit={(id) => onEditApplication(id)}
          pageChange={pageChange}
          rowsPaginationChange={rowsPaginationChange}
          colorArea={storeTopic.color}
        />
      </div>

      {isOpen && (
        <ApplicationForm
          isNewForm={isNewForm}
          topicId={Number(idTopic)}
          applicationId={idApplication}
          onClose={() => setIsOpen(false)}
        />
      )}

      {isOpenTopicEdit && (
        <FormNewEditTopic
          isNewForm={false}
          idArea={-1}
          idTopic={idTopic}
          onClose={() => setIsOpenTopicEdit(false)}
        />
      )}

      <style jsx>{DetailsTopicStyles}</style>
      <style jsx>{DetailsTopicGlobalStyles}</style>
    </>
  )
}

export default DetailsTopicComponent
