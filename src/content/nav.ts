/**
 * One nav definition for the header and the footer. These were two separate
 * arrays with different shapes, which is how "Work" and "Stack" ended up easy
 * to change in one place and forget in the other.
 */
export interface NavLink {
  href: '/' | '/experience' | '/skills' | '/about' | '/contact'
  label: string
}

export const navLinks: Array<NavLink> = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Work' },
  { href: '/skills', label: 'Stack' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]
