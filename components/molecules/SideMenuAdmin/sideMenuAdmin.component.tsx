import { useEffect, useId, useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getSectionByRoute } from 'utils/hooks/useTreeMenu'

import { Section } from './sideMenuAdmin.model'
import { SideMenuAdminLocalStyles } from './sideMenuAdmin.styles'

export type SideMenuAdminComponentProps = {
  sections: Section[]
  onChangeSection: () => unknown
}

export const SideMenuAdminComponent = ({
  sections,
  onChangeSection,
}: SideMenuAdminComponentProps) => {
  // Hooks
  const pageId = useId()
  const sectionId = useId()

  const router = useRouter()

  // States
  const [disabled, setDisabled] = useState(true)

  // Effect
  useEffect(() => {
    setTimeout(() => {
      setDisabled(false)
    }, 1500)
  }, [])

  // Methods
  const checkIsSelectedSection = (url: string) => {
    const currentFragment = router.asPath.split('/')[1]
    const selectedSection = getSectionByRoute(currentFragment) ?? currentFragment
    const isSelected = url.includes(selectedSection)

    return isSelected
  }

  // Render
  return (
    <>
      <div className="adminList__container">
        {!!sections?.length &&
          sections.map(({ title, pages }) => (
            <div key={`${title}-${sectionId}`} className="adminList__sections">
              <div className="adminList__title">
                <Typography variant="label" weight="bold" color={theme.colors.neutrals[400]}>
                  {title}
                </Typography>
              </div>
              {pages?.length && (
                <div className="adminList__pages">
                  {pages.map(({ icon: Icon, name, url }) => {
                    const isSelected = checkIsSelectedSection(url)

                    return (
                      <Link key={`${name}-${pageId}`} href={url}>
                        <button
                          type="button"
                          className={`adminList__item ${
                            isSelected ? 'adminList__item--selected' : ''
                          }`}
                          disabled={disabled}
                          onClick={() => onChangeSection()}>
                          <Icon />
                          <Typography variant={isSelected ? 's2' : 'p2'}>{name}</Typography>
                        </button>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
      </div>

      <style jsx>{SideMenuAdminLocalStyles}</style>
    </>
  )
}
