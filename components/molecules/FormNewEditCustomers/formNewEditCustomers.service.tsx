import { CustomerRequest } from 'services/models/customers/request.model'
import { CustomerResponse } from 'services/models/customers/response.model'
import { classroomService } from 'services/modules/classroom.module'
import { customerService } from 'services/modules/customers.module'
import { CustomerBase } from 'utils/models/customer.models'

import { FormUserCustomerModel } from './formNewEditCustomers.model'

export const getUserCustomer = async (idCustomer: number) => {
  const responseUser = await customerService.getCustomer(idCustomer)
  return responseUser.data
}

export const getCustomerKind = async () => {
  const responseKinds = await customerService.getKinds()
  return responseKinds.data
}

export const getIdentityTypes = async () => {
  const responseIdentitys = await customerService.getIdentityType()
  return responseIdentitys.data
}

export const getOrganizationIdentityTypes = async () => {
  const responseIdentitys = await classroomService.getIdentityTypes()
  return responseIdentitys.data
}

export const FormCustomerService = async (
  data: FormUserCustomerModel,
  customer?: CustomerResponse['getCustomer'],
  isNewForm?: boolean,
  _idCustomer?: number,
) => {
  if (!data) return -1
  const { user, avatar, logo, organization, kind } = data

  const organizationPost =
    kind.name === 'government' || kind.name === 'institution'
      ? {
          organization: {
            organizationKind: kind.name as CustomerBase['kind'],
            name: organization?.nameOrganization as string,
            sector:
              organization?.kindOrganization !== null
                ? organization?.kindOrganization?.name
                : undefined,
            educationKind:
              organization?.educationKindOrganization !== null
                ? organization?.educationKindOrganization?.name
                : undefined,
            country: organization?.countryOrganization.name as string,
            countryId: organization?.countryOrganization.id as number,
            state: organization?.stateOrganization?.name as string,
            stateId: organization?.stateOrganization?.id as number,
            city: organization?.cityOrganization?.name as string,
            cityId: organization?.cityOrganization?.id as number,
            address: organization?.addressOrganization as string,
            postalCode: organization?.postalCodeOrganization as string,
            phone: organization?.phoneOrganization as string,
            identityType: organization?.identityTypeOrganization.name as string,
            identityNumber: organization?.identityNumberOrganization as string,
          },
        }
      : undefined

  const bodyDataPost: CustomerRequest['createCustomer'] = {
    data: {
      kind: kind.name as CustomerBase['kind'],
      user: {
        ...user,
        country: String(user.country.name),
        countryId: user.country.id,
        state: String(user.state?.name),
        stateId: Number(user.state?.id),
        city: String(user.city?.name),
        cityId: Number(user.city?.id),
        identityType: user.identityType.name,
      },
      ...organizationPost,
    },
    avatar: avatar || undefined,
    logo: logo || undefined,
  }

  const customerOrganization =
    customer?.kind === 'government' || customer?.kind === 'institution'
      ? {
          organization: {
            organizationKind: customer.kind,
            name: String(organization?.nameOrganization),
            sector:
              customer.kind === 'institution'
                ? String(organization?.kindOrganization.name)
                : undefined,
            educationKind:
              customer.kind === 'institution'
                ? String(organization?.educationKindOrganization.name)
                : undefined,
            country: String(organization?.countryOrganization.name),
            countryId: Number(organization?.countryOrganization.id),
            state: String(organization?.stateOrganization?.name),
            stateId: Number(organization?.stateOrganization?.id),
            city: String(organization?.cityOrganization?.name),
            cityId: Number(organization?.cityOrganization?.id),
            address: String(organization?.addressOrganization),
            postalCode: String(organization?.postalCodeOrganization),
            phone: String(organization?.phoneOrganization),
            identityType: String(organization?.identityTypeOrganization.name),
            identityNumber: String(organization?.identityNumberOrganization),
          },
        }
      : undefined

  const bodyDataPut: CustomerRequest['updateCustomer'] = {
    data: {
      user: {
        ...user,
        avatarUrl: customer?.user.avatarUrl,
        country: user.country.name,
        countryId: user.country.id,
        state: String(user.state?.name),
        stateId: Number(user.state?.id),
        city: String(user.city?.name),
        cityId: Number(user.city?.id),
        identityType: user.identityType.name,
      },
      ...customerOrganization,
    },
    avatar,
    logo,
  }

  if (isNewForm) {
    const responsePostCustomer = await customerService.createCustomer(bodyDataPost)
    return responsePostCustomer.data.id
  }

  if (!isNewForm) {
    const responsePutCustomer = await customerService.updateCustomer(
      Number(_idCustomer),
      bodyDataPut,
    )
    return responsePutCustomer.data.id
  }
  throw new Error('default error')
}
