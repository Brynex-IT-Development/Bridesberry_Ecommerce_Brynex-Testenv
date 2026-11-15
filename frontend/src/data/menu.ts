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
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
];
