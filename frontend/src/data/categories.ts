export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  image?: string;
  description?: string;
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  image: string;
  description: string;
  subCategories: SubCategory[];
}

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'bridal-clutches',
    name: 'Bridal Clutches',
    slug: 'clutches',
    href: '/shop?category=clutches',
    image: '/discover-bag-model.jpg',
    description: 'Handcrafted bridal clutches, embroidered potlis, and royal evening bags.',
    subCategories: [
      {
        id: 'clutches',
        name: 'Clutches',
        slug: 'clutches',
        href: '/shop?category=clutches',
      },
      {
        id: 'potlis-pouches',
        name: 'Potlis & Pouches',
        slug: 'potlis-pouches',
        href: '/shop?category=clutches&sub=potlis',
      },
      {
        id: 'box-clutches',
        name: 'Box Clutches',
        slug: 'box-clutches',
        href: '/shop?category=clutches&sub=box',
      },
    ],
  },
  {
    id: 'bridal-footwear',
    name: 'Bridal Footwear',
    slug: 'footwear',
    href: '/shop?category=footwear',
    image: '/cat-footwear.jpg',
    description: 'Orthopedic-cushioned bridal heels, wedding sandals, and celebratory platforms.',
    subCategories: [
      {
        id: 'footwares',
        name: 'Footwares',
        slug: 'footwares',
        href: '/shop?category=footwares',
      },
      {
        id: 'bridal-heels',
        name: 'Bridal Heels',
        slug: 'bridal-heels',
        href: '/shop?category=bridal-heels',
      },
      {
        id: 'wedding-sandals',
        name: 'Wedding Sandals',
        slug: 'wedding-sandals',
        href: '/shop?category=wedding-sandals',
      },
    ],
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    slug: 'jewellery',
    href: '/shop?category=jewellery',
    image: '/cat-earrings.jpg',
    description: 'Heirloom bridal earrings, temple chokers, necklace sets, and hair accessories.',
    subCategories: [
      {
        id: 'necklaces',
        name: 'Necklaces',
        slug: 'necklaces',
        href: '/shop?category=necklaces',
      },
      {
        id: 'bracelets',
        name: 'Bracelets',
        slug: 'bracelets',
        href: '/shop?category=bracelets',
      },
      {
        id: 'earrings',
        name: 'Earrings',
        slug: 'earrings',
        href: '/shop?category=earrings',
      },
      {
        id: 'pendants-chains',
        name: 'Pendants & Chains',
        slug: 'pendants--chains',
        href: '/shop?category=pendants--chains',
      },
      {
        id: 'bangles',
        name: 'Bangles',
        slug: 'bangles',
        href: '/shop?category=bangles',
      },
      {
        id: 'rings',
        name: 'Rings',
        slug: 'rings',
        href: '/shop?category=rings',
      },
    ],
  },
];

