/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import Spinner from 'components/atoms/Spinner'
import { CustomerResponse } from 'services/models/customers/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { customerService } from 'services/modules/customers.module'
import { subscriptionsService } from 'services/modules/subscriptions.module'

import { useNotification } from '../../../utils/hooks/notification'
import DetailsPackageComponent from './detailsPackage.component'

export type PackageProps = {
  idPackage: number
}

const DetailPackageContainer = ({ idPackage }: PackageProps) => {
  const [packageData, setPackageData] = useState<CustomerResponse['getPackageDetail']>()
  const [selectedProds, setPackagesData] = useState<SubscriptionsResponse['getPackages']>()
  const { onError } = useNotification()

  useEffect(() => {
    const getDetailData = async () => {
      if (!idPackage) return
      try {
        const [packageResponse, listByKind] = await Promise.all([
          customerService.getPackageDetail(idPackage),
          subscriptionsService.getPackages(idPackage),
        ])

        setPackagesData(listByKind.data)
        setPackageData(packageResponse.data)
      } catch {
        onError('Error al cargar los datos del paquete')
      }
    }
    void getDetailData()
  }, [])

  const storeData = {
    visible: packageData?.visible,
    price: packageData?.price,
    iconUrl: packageData?.icon?.url,
    name: packageData?.name,
    idPackage,
  }

  return packageData && selectedProds ? (
    <DetailsPackageComponent
      storeData={storeData}
      tabsData={packageData.translations}
      selectedProds={selectedProds}
    />
  ) : (
    <Spinner />
  )
}

export default DetailPackageContainer
