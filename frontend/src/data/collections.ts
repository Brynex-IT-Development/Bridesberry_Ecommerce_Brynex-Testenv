export interface CollectionConfig {
  slug: string;
  h1: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  categoryFilter?: string; // category query param or collection param
  collectionFilter?: string;
  newArrival?: boolean;
  bestSeller?: boolean;
  introText: string;
  bodyTitle: string;
  bodyParagraphs: string[];
  stylingTips: string[];
  relatedCollection: {
    name: string;
    href: string;
  };
  relatedArticle: {
    title: string;
    href: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const COLLECTIONS_DATA: Record<string, CollectionConfig> = {
  'bridal-earrings': {
    slug: 'bridal-earrings',
    h1: 'Bridal Earrings',
    primaryKeyword: 'bridal earrings',
    metaTitle: 'Bridal Earrings – Pearl, Kundan & Jhumka | Brides Berry',
    metaDescription: 'Shop handcrafted bridal earrings, from pearl drops to kundan jhumkas. Lightweight, elegant designs for your wedding day. Delivery across India.',
    categoryFilter: 'earrings',
    introText:
      "Discover handcrafted bridal earrings designed for every moment of your wedding day. From pearl drops and kundan jhumkas to delicate crystal studs, each pair is made to complement your bridal look, whether it's a Kerala silk saree, a lehenga or a white gown.",
    bodyTitle: 'Artisan Craftsmanship & Styling Advice for Brides',
    bodyParagraphs: [
      'Every pair of Brides Berry bridal earrings is meticulously assembled using high-grade brass and copper bases, dipped in multi-layer 18K/24K micro-gold plating, and adorned with hand-selected freshwater pearls and uncut Polki glass crystals.',
      'For traditional Kerala Hindu brides draped in Kasavu or Kanchipuram sarees, our antique gold-finish jhumkas and ear-cuffs add sacred warmth without overwhelming the neckline. Christian brides walking down the aisle in lace gowns frequently choose our luminous Radhika pearl drops for a timeless, regal finish. Muslim brides styling elaborate reception lehengas pair our oversized Chandbalis with matching maang tikkas for show-stopping bridal drama.',
    ],
    stylingTips: [
      'Weight Balance: All our bridal earrings feature lightweight hollow-back casting and hypoallergenic surgical steel posts to ensure effortless all-day wear from morning poojas to midnight receptions.',
      'Neckline Pairing: Pair statement jhumkas with sweetheart or high necklines where a heavy necklace is not required.',
      'Jewellery Care: Store in dry velvet pouches away from perfumes and hairsprays to preserve the micro-gold lustre for generations.',
    ],
    relatedCollection: {
      name: 'Bridal Necklaces & Sets',
      href: '/collections/bridal-necklaces',
    },
    relatedArticle: {
      title: 'How to Choose Bridal Jewellery for Your Neckline',
      href: '/blog/how-to-choose-bridal-jewellery-for-your-neckline',
    },
    faqs: [
      {
        question: 'Are Brides Berry bridal earrings lightweight enough for a full wedding day?',
        answer:
          'Yes. We engineer our bridal earrings with specialized hollow-back setting techniques, ensuring even statement jhumkas and chandeliers weigh under 25–35 grams per pair with zero earlobe pulling.',
      },
      {
        question: 'Can I wear these earrings with sensitive ears?',
        answer:
          'Absolutely. All Brides Berry earrings feature hypoallergenic, nickel-free surgical steel or gold-plated brass posts suitable for sensitive skin.',
      },
      {
        question: 'How quickly can bridal earrings be delivered in Kerala and across India?',
        answer:
          'Standard delivery takes 3 business days across Kerala and major Indian metros. Express Delivery arrives within 2 business days.',
      },
    ],
  },

  'bridal-necklaces': {
    slug: 'bridal-necklaces',
    h1: 'Bridal Necklaces & Sets',
    primaryKeyword: 'bridal necklace set',
    metaTitle: 'Bridal Necklaces & Sets – Chokers & Temple Jewellery | Brides Berry',
    metaDescription: 'Shop exquisite bridal necklace sets, kundan chokers and temple jewellery for Kerala and Indian weddings. Handcrafted with express delivery across India.',
    categoryFilter: 'necklaces',
    introText:
      'Elevate your wedding attire with our bridal necklace sets, sculpted to honour heirloom royal traditions. From intricate Kundan chokers to layered temple malas and delicate pearl collar necklaces, find the crowning glory of your bridal trousseau.',
    bodyTitle: 'Heirloom Necklaces Tailored to Indian Wedding Ceremonies',
    bodyParagraphs: [
      'A bride’s necklace sets the rhythm of her entire trousseau. Our collection merges antique gold finishes with uncut stones, South Sea shell pearls, and hand-carved floral motifs that harmonize effortlessly with both traditional and contemporary silhouettes.',
      'For south Indian wedding muhurthams, layering a close-fitting choker with a longer temple haaram creates an authentic royal cascade against pure silk weaves. If you are celebrating an evening reception or Christian church nuptials, our minimalist crystal and pearl collars offer refined poise.',
    ],
    stylingTips: [
      'Neckline Harmony: Match chokers with deep V-necks, sweetheart cuts, or off-shoulder blouses. Layered malas complement round and boat necklines.',
      'Adjustable Dori: Every necklace includes an adjustable handcrafted silk dori or extender chain for a tailored, snug fit on any neck circumference.',
    ],
    relatedCollection: {
      name: 'Bridal Earrings',
      href: '/collections/bridal-earrings',
    },
    relatedArticle: {
      title: 'The Complete Kerala Bride Jewellery Guide',
      href: '/blog/the-complete-kerala-bride-jewellery-guide',
    },
    faqs: [
      {
        question: 'Does the necklace set include matching earrings?',
        answer:
          'Yes, our bridal necklace sets include coordinating earrings specifically curated to balance the necklace design in weight and aesthetic.',
      },
      {
        question: 'Can the necklace length be adjusted?',
        answer:
          'Every necklace set features a soft adjustable cord (dori) or extendable links allowing you to adjust the drop from 14 inches to 22 inches.',
      },
      {
        question: 'What materials are used in Brides Berry bridal necklace sets?',
        answer:
          'We use copper-brass alloys with premium micro-gold plating, faux uncut polki glass crystals, and semi-precious beads that deliver the brilliance of fine heirloom jewellery at an accessible price point.',
      },
    ],
  },

  'bridal-heels': {
    slug: 'bridal-heels',
    h1: 'Bridal Heels & Sandals',
    primaryKeyword: 'bridal heels',
    metaTitle: 'Bridal Heels & Wedding Sandals | Brides Berry',
    metaDescription: 'Comfortable, embellished bridal heels and sandals for every wedding look. Find your perfect pair at Brides Berry. Easy exchanges.',
    categoryFilter: 'footwear',
    introText:
      'Step into your forever with handcrafted bridal heels and embellished sandals engineered for royal grandeur and unconditional comfort. Designed for brides who refuse to choose between breathtaking glamour and dancing through the night.',
    bodyTitle: 'Orthopedic Cushioning Meets Couture Bridal Aesthetics',
    bodyParagraphs: [
      'Indian weddings demand hours on your feet—from mandap ceremonies and photo sessions to sangeet choreography. Brides Berry bridal heels feature custom multi-density memory foam footbeds and ergonomic arch contours concealed beneath hand-embroidered zardozi, crystals, and metallic finishes.',
      'Whether you require block heels that will not sink into outdoor lawn celebrations or sleek metallic stilettos for your reception entrance, each pair is balanced to distribute weight evenly across the foot.',
    ],
    stylingTips: [
      'Block Heels for Outdoor Lawns: If your ceremony takes place on grass or uneven paving, opt for our 2.5–3 inch block heels for steady stability.',
      'Heel Height Sizing: Choose your heel height based on the final hemline of your bridal lehenga or gown to avoid tripping.',
    ],
    relatedCollection: {
      name: 'Bridal Hair Accessories & Veils',
      href: '/collections/hair-accessories',
    },
    relatedArticle: {
      title: 'How to Choose Comfortable Bridal Heels',
      href: '/blog/how-to-choose-comfortable-bridal-heels',
    },
    faqs: [
      {
        question: 'Are Brides Berry bridal heels comfortable for 8+ hours?',
        answer:
          'Yes. Every pair is lined with high-density orthotic memory foam padding and non-slip textured outsoles to prevent fatigue during extended ceremonies.',
      },
      {
        question: 'What if the size does not fit?',
        answer:
          'We offer a 7-day doorstep size exchange policy across India so you can achieve the exact fit well before your wedding dates.',
      },
      {
        question: 'What heel heights do you offer?',
        answer:
          'Our bridal footwear collection spans comfortable 1.5-inch kitten heels, 2.5 to 3.2-inch block heels, and 4-inch platform stilettos.',
      },
    ],
  },

  'hair-accessories': {
    slug: 'hair-accessories',
    h1: 'Bridal Hair Accessories & Veils',
    primaryKeyword: 'bridal hair accessories',
    metaTitle: 'Bridal Hair Accessories, Matha Patti & Veils | Brides Berry',
    metaDescription: 'Shop handcrafted bridal hair accessories, matha patti, maang tikka, and wedding hair vines. Fast delivery across India.',
    categoryFilter: 'hair-accessories',
    introText:
      'Crown your wedding hairstyle with handcrafted bridal hair accessories, matha pattis, maang tikkas, and crystal hair vines. Designed to stay securely pinned through bridal entries, ceremonies, and sangeet celebrations.',
    bodyTitle: 'Intricate Hair Adornments for Every Bridal Coiffure',
    bodyParagraphs: [
      'From traditional South Indian poola jada and temple billai sets woven into jasmine braids to soft floral hair vines woven into modern bohemian bridal updos, our hair accessories complete the 360-degree bridal silhouette.',
      'Crafted with bendable wire frames and discrete hairpin anchor loops, each piece can be shaped by your hairstylist to fit bun styles, cascading waves, or traditional braids effortlessly.',
    ],
    stylingTips: [
      'Hairstylist Friendly: Flexible wire loops allow invisible bobby pins and U-pins to secure the accessory without flattening hair volume.',
      'Veil Pairing: Place your hair vine or comb directly above the comb anchor of your bridal veil for seamless layering.',
    ],
    relatedCollection: {
      name: 'Bridal Earrings',
      href: '/collections/bridal-earrings',
    },
    relatedArticle: {
      title: 'Christian Bridal Accessories: Veils, Earrings & Heels',
      href: '/blog/christian-bridal-accessories-veils-earrings-and-heels',
    },
    faqs: [
      {
        question: 'Will these hair accessories slip during dancing or movement?',
        answer:
          'No. All our bridal combs and vines feature textured grips and anchor loops designed for hairstylists to pin securely with standard bobby pins.',
      },
      {
        question: 'Are the hair vines flexible?',
        answer:
          'Yes, our hair vines are hand-woven on pliable jewellery wire that can be contoured around braids, buns, or swept through half-up half-down hairstyles.',
      },
      {
        question: 'Do you offer matching maang tikkas and matha pattis?',
        answer:
          'Yes, we provide standalone maang tikkas as well as multi-tier matha pattis coordinating with our earrings and necklace sets.',
      },
    ],
  },

  'new-arrivals': {
    slug: 'new-arrivals',
    h1: 'New Bridal Arrivals',
    primaryKeyword: 'new bridal jewellery',
    metaTitle: 'New Bridal Arrivals – Latest Jewellery & Accessories | Brides Berry',
    metaDescription: 'Explore the latest bridal jewellery, earrings, necklaces, and accessories fresh from our Kerala artisan studios. Shop newest wedding trends.',
    newArrival: true,
    introText:
      'Discover the latest bridal creations fresh from our design studio. Featuring contemporary silhouettes, innovative lightweight settings, and seasonal wedding trends curated for the modern Indian bride.',
    bodyTitle: 'The New Season Bridal Edit: Contemporary Grace',
    bodyParagraphs: [
      'Our new arrivals showcase seasonal evolutions in Indian bridal couture—from rose-gold plated freshwater pearl accents to sleek geometric chokers that transition smoothly from destination mehendi sundowners to traditional mandap rituals.',
      'Each new release is produced in limited bridal batches to guarantee exceptional quality control and exclusivity for your special day.',
    ],
    stylingTips: [
      'Limited Releases: Many new arrival designs are crafted in limited quantities; order 4–6 weeks prior to wedding dates to secure your favorite styles.',
      'Styling Concierge: Chat with our WhatsApp concierge for early access to upcoming seasonal drops or custom matching requests.',
    ],
    relatedCollection: {
      name: 'Best Sellers',
      href: '/collections/best-sellers',
    },
    relatedArticle: {
      title: 'Bridal Jewellery Trends for 2026',
      href: '/blog/bridal-jewellery-trends-for-2026',
    },
    faqs: [
      {
        question: 'How often are new bridal designs added?',
        answer:
          'We introduce new curated capsules monthly, focusing on upcoming wedding season color palettes and celebratory aesthetics.',
      },
      {
        question: 'Are new arrival products available for immediate dispatch?',
        answer:
          'Yes, all active items in New Arrivals are in stock and ready to ship within 24–48 hours from our Kerala studio.',
      },
    ],
  },

  'best-sellers': {
    slug: 'best-sellers',
    h1: 'Best Selling Bridal Jewellery',
    primaryKeyword: 'best bridal jewellery',
    metaTitle: 'Best Selling Bridal Jewellery & Accessories | Brides Berry',
    metaDescription: 'Explore the most-loved bridal jewellery, earrings, and wedding accessories chosen by hundreds of Kerala and Indian brides. Shop top rated pieces.',
    bestSeller: true,
    introText:
      'Explore the iconic bridal jewellery and accessories adored by hundreds of brides across Kerala and India. These verified best-sellers represent our most coveted designs, celebrated for their radiant beauty and flawless comfort.',
    bodyTitle: 'Time-Tested Favorites Celebrated by Real Brides',
    bodyParagraphs: [
      'From our viral Radhika Pearl Drop Earrings to our grand heritage temple necklaces, our best-sellers have stood the test of real weddings, long ceremonies, and camera flashes.',
      'Each piece in this collection has earned top acclaim for its craftsmanship, lightweight comfort, and photograph-ready brilliance.',
    ],
    stylingTips: [
      'Tried & Tested: These designs have adorned hundreds of brides across Hindu, Christian, and Muslim wedding ceremonies.',
      'Gifting Ready: Best sellers arrive in luxury magnetic keepsake boxes, making them ideal wedding morning gifts for bridesmaids and brides.',
    ],
    relatedCollection: {
      name: 'New Bridal Arrivals',
      href: '/collections/new-arrivals',
    },
    relatedArticle: {
      title: 'The Complete Kerala Bride Jewellery Guide',
      href: '/blog/the-complete-kerala-bride-jewellery-guide',
    },
    faqs: [
      {
        question: 'Why are these pieces the most popular?',
        answer:
          'Our best-sellers feature the highest customer review ratings for all-day comfort, versatile styling across wedding events, and exceptional photo clarity.',
      },
      {
        question: 'Do best-sellers restock if sold out?',
        answer:
          'Yes, popular pieces are restocked regularly. However, due to meticulous hand-finishing, restock batches take 2–3 weeks.',
      },
    ],
  },

  'bridal-clutches': {
    slug: 'bridal-clutches',
    h1: 'Bridal Clutches & Evening Bags',
    primaryKeyword: 'bridal clutches',
    metaTitle: 'Bridal Clutches, Potlis & Evening Bags | Brides Berry',
    metaDescription: 'Shop handcrafted bridal clutches, embroidered potlis, and royal wedding evening bags. Delivery across India.',
    categoryFilter: 'bridal-clutches',
    introText:
      'Discover handcrafted bridal clutches, embroidered silk potlis, and crystal evening bags designed to hold your wedding day essentials with royal elegance.',
    bodyTitle: 'Artisan Embroidery & Luxurious Bridal Bags',
    bodyParagraphs: [
      'A bride’s clutch is both a cherished keepsake and a functional necessity on her wedding day. From raw silk potlis adorned with pearls and zardozi to structured velvet box clutches with metallic handles, each piece is designed to complement lehengas, sarees, and gowns.',
      'Our clutches feature secure clasp closures, optional detachable metallic chains, and velvet-lined interiors spacious enough for wedding day essentials.',
    ],
    stylingTips: [
      'Color Coordination: Choose a metallic gold or antique brass clutch if you are wearing multiple wedding outfits, as it transitions seamlessly across ceremonies.',
      'Hand-Held Comfort: All box clutches include smooth ergonomic handles or optional shoulder chains for effortless hands-free mingling.',
    ],
    relatedCollection: {
      name: 'Bridal Heels & Sandals',
      href: '/collections/bridal-heels',
    },
    relatedArticle: {
      title: 'Christian Bridal Accessories: Veils, Earrings & Heels',
      href: '/blog/christian-bridal-accessories-veils-earrings-and-heels',
    },
    faqs: [
      {
        question: 'Can the bridal clutch fit a modern smartphone?',
        answer:
          'Yes, all our bridal box clutches and potlis are sized to comfortably fit modern smartphones along with lipstick, keys, and touch-up essentials.',
      },
      {
        question: 'Does the clutch include a chain strap?',
        answer:
          'Yes, every clutch includes a detachable gold-plated snake or link chain allowing you to wear it over the shoulder or as a classic handheld minaudière.',
      },
    ],
  },
};

