import { FooterLink } from '../FooterLink'

import { IFooterSection } from './types'

export const FooterSection = ({ title, links }: IFooterSection) => (
  <div>
    <h3 className='mb-4 text-lg font-medium'>{title}</h3>
    <ul className='space-y-2 text-sm'>
      {links.map(link => (
        <FooterLink
          key={link.href}
          {...link}
        />
      ))}
    </ul>
  </div>
)
