import { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    name: 'Shop',
    href: '/shop',
  },
  {
    name: 'Category',
    href: '/shop',
    hasMegaMenu: true,
  },
  {
    name: 'Collections',
    href: '/shop',
    hasMegaMenu: false,
    megaMenuColumns: [],
  },
  {
    name: 'Contact',
    href: '#footer',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
];
