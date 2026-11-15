export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Bridal Styling' | 'Behind the Craft' | 'Jewelry Care' | 'Wedding Trends' | 'Real Brides';
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  featured?: boolean;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      quote?: string;
    }[];
    tips?: string[];
    featuredProducts?: {
      name: string;
      category: string;
      price: string;
      image: string;
      link: string;
    }[];
  };
}

export const BLOG_CATEGORIES = [
  'All',
  'Bridal Styling',
  'Behind the Craft',
  'Jewelry Care',
  'Wedding Trends',
  'Real Brides',
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-choose-bridal-jewellery-for-your-neckline',
    title: 'How to Choose Bridal Jewellery for Your Neckline',
    subtitle: 'The golden ratio of neckpiece spacing, neckline geometry, and gemstone harmony for modern Indian brides.',
    excerpt: 'From sweetheart blouses to high collar Kasavu sarees and Christian lace gowns, master the geometry of pairing bridal necklaces and earrings with your neckline.',
    category: 'Bridal Styling',
    readTime: '6 min read',
    publishedAt: 'November 10, 2026',
    author: {
      name: 'Pooja Menon',
      role: 'Principal Bridal Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    content: {
      intro:
        'A bride’s neckline is the focal point of every photograph. Yet, the most common bridal dilemma is choosing between heavy chokers, cascading temple necklaces, and statement earrings without creating visual clutter against intricate blouse embroidery.',
      sections: [
        {
          heading: '1. Sweetheart & Plunging Necklines: The Power of Chokers',
          body:
            'A sweetheart neckline naturally draws eyes downward toward the collarbone. To accentuate this curve without competing with the blouse, choose a structured Kundan choker or a multi-layered Polki collar that hugs the base of the neck. Ensure at least 1.5 inches of bare skin remains between the necklace drop and the blouse border to let your collarbone breathe.',
          quote:
            '“Negative space is the secret ingredient of royal bridal jewellery. The eye needs a moment of breath between gold craftsmanship and silk fabric.”',
        },
        {
          heading: '2. Deep V-Necks & Scoop Blouses: Layered Harmony',
          body:
            'For deep V-necks popular in reception lehengas, pairing a close-fitting choker with a longer Rani Haar or temple mala creates an elongated, slimming vertical line. The longer necklace should follow the angle of the V-cut rather than resting horizontally across it.',
        },
        {
          heading: '3. Boat Necks & High Collars: Statement Earrings First',
          body:
            'When wearing a high boat neck or embroidered Mandarin collar, skip heavy necklaces entirely. A choker against a high neckline creates crowding. Instead, invest in dramatic statement Chandbalis or grand temple Jhumkas that extend down to frame the jawline effortlessly.',
        },
        {
          heading: '4. Christian Bridal Gowns & Illusion Lace',
          body:
            'For Christian church nuptials in ivory or white lace, luminous freshwater pearl drops or delicate crystal collars provide radiant elegance without stealing attention from delicate neckline embroidery.',
        },
      ],
      tips: [
        'Always try on your jewellery while wearing your actual blouse or a top with the identical neckline cut.',
        'Choose lightweight hollow-back earrings when your necklace is heavy to prevent earlobe fatigue during 4-hour ceremonies.',
        'Replace rigid clasps with adjustable silk zari dori cords so your stylist can micro-adjust drop length on your wedding morning.',
      ],
      featuredProducts: [
        {
          name: 'Radhika Pearl Drop Earrings',
          category: 'Earrings',
          price: '₹1,399',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
          link: '/collections/bridal-earrings',
        },
        {
          name: 'Meera Kundan Choker Set',
          category: 'Necklaces',
          price: '₹3,499',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
          link: '/collections/bridal-necklaces',
        },
      ],
    },
  },

  {
    slug: 'the-complete-kerala-bride-jewellery-guide',
    title: 'The Complete Kerala Bride Jewellery Guide: Kasavu, Temple & Christian Nuptials',
    subtitle: 'From gold Kasavu weaves to cathedral veils: a cultural handbook for wedding adornments.',
    excerpt: 'Everything Kerala brides need to know about styling traditional temple jewellery, Polki chokers, and pearl heirlooms for Hindu, Christian, and Muslim wedding celebrations.',
    category: 'Bridal Styling',
    readTime: '7 min read',
    publishedAt: 'November 05, 2026',
    author: {
      name: 'Aurelia Varma',
      role: 'Principal Bridal Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1611591475152-478311389af5?auto=format&fit=crop&w=1200&q=85',
    content: {
      intro:
        'Kerala weddings are renowned for their radiant elegance, where gold-threaded Kasavu sarees and pristine white silks form the canvas for bridal heirlooms. Whether walking the sacred aisle of a heritage church in Kochi or taking seven steps around the temple fire, your jewellery harmonises generations of ritual.',
      sections: [
        {
          heading: 'The Hindu Muhurtham: The Art of Temple Layering',
          body:
            'A traditional Kerala Hindu bride’s look centers around classic gold temple motifs: the Mullamottu Mala (jasmine bud necklace), Palakka Mala (green glass leaf necklace), and Nagapada Thali. Modern brides love pairing an antique micro-gold choker with a longer Kasumala to honor heritage while keeping overall weight featherlight.',
          quote:
            '“Kerala bridal grace lies in authentic motifs—jasmine buds, sacred leaves, and warm antique micro-gold finishes that glow beside pure Kasavu zari.”',
        },
        {
          heading: 'The Christian Church Nuptials: Luminous Pearls & White Elegance',
          body:
            'Christian brides in Kerala traditionally wear ivory silk sarees or tailored lace cathedral gowns. The timeless combination of baroque freshwater pearls, delicate drop earrings, and a crystal-adorned bridal hair comb creates an ethereal aura under church chandeliers.',
        },
        {
          heading: 'The Muslim Nikah & Reception: Grandeur in Polki & Chandbalis',
          body:
            'Nikah ceremonies and evening receptions call for opulent stone-setting. Oversized kundan Chandbalis paired with coordinating maang tikkas and velvet-accented choker sets reflect rich emerald and crimson lehengas with royal poise.',
        },
      ],
      tips: [
        'Balance warm gold tones with your saree’s zari: antique matte gold pairs best with vintage zari, while bright 24K plating suits fresh golden tissue Kasavu weaves.',
        'Use double-sided fabric tape behind broad necklaces to keep them perfectly centered during temple poojas and pranamams.',
      ],
      featuredProducts: [
        {
          name: 'Radhika Pearl Drop Earrings',
          category: 'Earrings',
          price: '₹1,399',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
          link: '/collections/bridal-earrings',
        },
        {
          name: 'Meera Kundan Choker Set',
          category: 'Necklaces',
          price: '₹3,499',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
          link: '/collections/bridal-necklaces',
        },
      ],
    },
  },

  {
    slug: 'bridal-jewellery-trends-for-2026',
    title: 'Bridal Jewellery Trends for 2026: Lightweight Grandeur & Modern Silhouettes',
    subtitle: 'What modern brides are wearing: ergonomic casting, colored gemstones, and versatile modular sets.',
    excerpt: 'Explore the definitive bridal jewellery trends of 2026—from hollow-cast lightweight earrings to emerald accents and versatile heirloom sets designed for life beyond the wedding day.',
    category: 'Wedding Trends',
    readTime: '5 min read',
    publishedAt: 'October 28, 2026',
    author: {
      name: 'Pooja Menon',
      role: 'Principal Bridal Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    content: {
      intro:
        'Gone are the days when brides suffered through 60-gram heavy metal earrings that pulled on earlobes and rigid chokers that bruised collarbones. The modern 2026 bride demands bridal grandeur engineered with uncompromising comfort.',
      sections: [
        {
          heading: '1. Lightweight Hollow-Cast Engineering',
          body:
            'The single biggest technological advancement in contemporary Indian bridal jewellery is hollow-back micro-casting. By removing unnecessary solid brass mass from behind stones, earrings and necklaces retain 100% of their visual volume while cutting physical weight by nearly 50%.',
        },
        {
          heading: '2. Freshwater Pearl Collars & Drops',
          body:
            'Organic pearls have overtaken heavy polki as the bridal favorite for destination weddings and daytime celebrations. Natural baroque textures and lustrous cream pearls feel fresh, youthful, and infinitely wearable long after the wedding ceremonies end.',
        },
        {
          heading: '3. Modular Pieces for Post-Wedding Wear',
          body:
            'Brides are actively seeking pieces that can be deconstructed. A heavy wedding choker that detaches into a delicate single-strand pendant or statement earrings with removable jhumka drops allows heirloom investments to be enjoyed on everyday anniversaries and festivals.',
        },
      ],
      tips: [
        'Invest in detachable styles so you can repurpose your bridal set for friends’ weddings and family gatherings.',
        'Choose hypoallergenic surgical posts to prevent skin redness or irritation on your wedding day.',
      ],
      featuredProducts: [
        {
          name: 'Radhika Pearl Drop Earrings',
          category: 'Earrings',
          price: '₹1,399',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
          link: '/collections/bridal-earrings',
        },
      ],
    },
  },

  {
    slug: 'christian-bridal-accessories-veils-earrings-and-heels',
    title: 'Christian Bridal Accessories: Veils, Earrings & Heels',
    subtitle: 'From cathedral lace veils to cushioned church aisle heels: curating your church nuptials.',
    excerpt: 'The complete styling blueprint for Christian brides—how to choose comfortable wedding heels, pair luminous pearl earrings, and anchor delicate veils.',
    category: 'Bridal Styling',
    readTime: '6 min read',
    publishedAt: 'October 15, 2026',
    author: {
      name: 'Aurelia Varma',
      role: 'Principal Bridal Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    content: {
      intro:
        'Walking down the aisle toward the altar is one of the most emotional moments in a bride’s life. Christian bridal elegance relies on sublime harmony between the veil, bridal earrings, and comfortable heels that carry you gracefully through the procession.',
      sections: [
        {
          heading: 'Choosing the Right Veil Length & Hairpiece Anchor',
          body:
            'Whether choosing a fingertip veil or a sweeping cathedral lace train, anchor your hair comb directly into a secure bobby-pin bed. Adorning the comb attachment with a freshwater pearl or crystal hair vine ensures your hairstyle looks complete even after lifting the veil.',
        },
        {
          heading: 'Pearl Earrings: The Ultimate Bridal Classic',
          body:
            'Drop earrings featuring luminous freshwater pearls catch the church stained-glass light with gentle radiance. For lace gowns with high illusion necklines, avoid necklaces and let elongated pearl drops define your face framing.',
        },
        {
          heading: 'Cushioned Bridal Heels for the Church Aisle & Reception',
          body:
            'Between church prayers, family greetings at the parish hall, and reception first dances, brides spend over 8 hours standing. Opt for 2.5–3 inch block heels or cushioned platforms with multi-density orthotic foam to glide effortlessly without foot fatigue.',
        },
      ],
      tips: [
        'Break in your bridal shoes at home with socks for 20 minutes a day during the week before the wedding.',
        'Apply a tiny drop of translucent spirit gum behind earring posts if your veil catches the breeze during outdoor photo sessions.',
      ],
      featuredProducts: [
        {
          name: 'Radhika Pearl Drop Earrings',
          category: 'Earrings',
          price: '₹1,399',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
          link: '/collections/bridal-earrings',
        },
      ],
    },
  },
];
