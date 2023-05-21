import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { Dialog } from 'components/atoms/Dialog'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'

import { SelectedProductsStyles } from './selecterdProducts.styles'

type Props = {
  products: SubscriptionsResponse['getPackages']
}
const { colors } = theme
export const SelectedProducts = ({ products }: Props) => (
  <section className="selected__details">
    {/* Map section */}
    {products.length > 0 ? (
      products.map((item) => (
        <div key={item.key} className="selected__section">
          <Typography variant="label" color={colors.neutrals[300]}>
            {item.label}
          </Typography>
          {item.contents.map((content) => (
            <div key={content.id} className="selected__content">
              <Typography variant="c1" color={colors.neutrals[500]}>
                {content.name}
              </Typography>
              {content?.area && (
                <div className="selected__badge">
                  <Typography variant="c1" color={colors.primary[500]}>
                    {content.area}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </div>
      ))
    ) : (
      <Dialog message="No se encontraron productos seleccionados" type="warning" />
    )}
    <style jsx>{SelectedProductsStyles}</style>
  </section>
)
