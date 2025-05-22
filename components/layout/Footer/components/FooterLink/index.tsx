import Link from 'next/link'

export const FooterLink = ({ label, href }: IFooterLink) => (
  <li>
    <Link
      href={href}
      className='text-muted-foreground hover:text-foreground transition-colors'
    >
      {label}
    </Link>
  </li>
)
