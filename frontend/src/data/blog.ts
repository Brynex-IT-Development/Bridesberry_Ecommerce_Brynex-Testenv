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
    slug: 'the-art-of-bridal-layering-choker-to-rani-haar',
    title: 'The Art of Bridal Layering: How to Style Chokers, Gulbandhs & Rani Haars',
    subtitle: 'The golden ratio of neckpiece spacing, neckline geometry, and gemstone gradients for the modern royal bride.',
    excerpt: 'From collarbone-hugging Kundan chokers to sweeping Basra pearl Rani Haars, master the royal three-tier layering technique that frames your bridal blouse with architectural grace.',
    category: 'Bridal Styling',
    readTime: '7 min read',
    publishedAt: 'October 28, 2026',
    author: {
      name: 'Aurelia Varma',
      role: 'Principal Bridal Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    content: {
      intro: 'A bride’s neckline is sacred ground. It anchors the sacred Varmala garlands, catches the candle-light of the Mandap, and commands every portrait. Yet, the most common bridal grievance is overcrowding—when heavy neckpieces clatter, overlap, and hide the intricate zardozi craftsmanship of the blouse.',
      sections: [
        {
          heading: 'Tier 1: The Foundation Gulbandh or Choker (13 to 14 Inches)',
          body: 'Your base layer must hug the hollow of the collarbone. A flat, articulated Kundan or Jadau choker with hand-strung seed pearls creates an unbroken line of brilliance. If your blouse has a sweetheart or scoop cut, ensure the choker leaves at least 1.5 inches of bare skin before the fabric neckline begins. This negative space allows the neck to appear elongated and regal rather than cramped.',
          quote: '“Negative space is the secret ingredient of royal jewelry. The eye needs a moment of breath between the sparkle of gold and the richness of silk.”',
        },
        {
          heading: 'Tier 2: The Mid-Chest Hasli or Collar (17 to 19 Inches)',
          body: 'The transition piece connects the choker with the grand haar below. An engraved Hasli torque or a graduated navratan collar works best. This layer should rest gently upon the blouse fabric, sitting 2 to 3 fingers below the choker pendant drop. Choose stones that echo your lehenga borders—uncut Polki framed by Russian emerald tumble beads creates breathtaking contrast against crimson and burgundy silks.',
        },
        {
          heading: 'Tier 3: The Imperial Rani Haar or Satlada (26 to 32 Inches)',
          body: 'The crowning jewel of the ensemble is the Rani Haar. Cascading gracefully past the bustline toward the waistline, this piece balances the heavy volume of your lehenga skirt. Multi-strand Basra pearls, carved Zambian emeralds, or intricate temple nakshi plaques provide movement as you walk down the aisle toward the mandap.',
        },
      ],
      tips: [
        'Always replace rigid metal clasps with adjustable silk zari dori cords behind the neck; this lets your stylist micro-adjust necklace drop lengths on the morning of the wedding.',
        'If your bridal dupatta is draped across the chest (Gujarati or royal pleated pallu), eliminate Tier 2 and wear only a high choker combined with a longer Tier 3 haar to avoid fabric snagging.',
        'Test your jewelry while sitting cross-legged. Many brides only try on necklaces standing up, forgetting that during 2 hours of Pheras, layers can bunch up if not weighted properly.',
      ],
      featuredProducts: [
        {
          name: 'Royal Heritage Kundan Choker',
          category: 'Necklaces',
          price: '₹1,24,000',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
          link: '/shop?category=necklaces',
        },
        {
          name: 'Emerald Cascade Rani Haar',
          category: 'Necklaces',
          price: '₹1,85,000',
          image: 'https://images.unsplash.com/photo-1611591475152-478311389af5?auto=format&fit=crop&w=600&q=80',
          link: '/shop?category=necklaces',
        },
      ],
    },
  },
  {
    slug: 'the-definitive-guide-to-bridal-headpieces-matha-patti-maang-tikka',
    title: 'The Definitive Guide to Bridal Headpieces: Matha Patti, Maang Tikka & Passa',
    subtitle: 'Symmetry, face framing, and dupatta weight: how to crown your bridal portraiture with effortless poise.',
    excerpt: 'A comprehensive manual for your crowning glory. Learn how to anchor heavy headpieces pain-free, balance forehead proportions, and choose between Mughal Passas and South Indian Nethi Chuttis.',
    category: 'Bridal Styling',
    readTime: '6 min read',
    publishedAt: 'October 22, 2026',
    author: {
      name: 'Aurelia Varma',
      role: 'Principal Bridal Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    content: {
      intro: 'When the shehnai plays and the bridal entry begins, the first jewel guests behold beneath the sheer red veil is the headpiece. Framing the brow and catching the sacred vermilion, your head adornment sets the emotional tone of your bridal aura.',
      sections: [
        {
          heading: 'Matha Patti vs. Sheeshpatti: Understanding the Architecture',
          body: 'A traditional Matha Patti features a central tikka linked to one or more forehead chains that drape along the hairline toward the ears. A Sheeshpatti, by contrast, sits further back on the crown like an articulated tiara. Brides with lower hair density or smaller foreheads look mesmerizing in a delicate Sheeshpatti paired with a standalone micro-tikka.',
          quote: '“A bridal headpiece should feel like an heirloom crown—commanding, secure, and weightlessly woven into your coiffure.”',
        },
        {
          heading: 'The Mughal Jhoomar / Passa: Asymmetrical Poetry',
          body: 'Worn tilted gracefully on the left temple, the fan-shaped Passa was popularized by royal Awadh courts. Today, fusion brides are pairing a sleek, single-strand Maang Tikka with an antique Passa for Sangeet nights and Muslim or Punjabi wedding ceremonies, creating depth and photogenic movement in three-quarter portrait angles.',
        },
        {
          heading: 'The Engineering of Dupatta Support',
          body: 'A heavy 2-kilogram velvet veil pinned over your hair can push your Matha Patti forward onto your eyebrows. To eliminate this disaster, ask your hairstylist to create a criss-crossed bobby pin anchor bed with a micro-braid along the central parting, hooking the weight directly onto the skull base rather than delicate front baby hairs.',
        },
      ],
      tips: [
        'Apply a tiny drop of clear, skin-safe spirit gum or medical tape behind the central tikka pendant; this prevents it from swinging sideways when you tilt your head during ceremonies.',
        'If you wear spectacles or heavy framed reading glasses, avoid double-band Matha Pattis that press against the temple arms.',
        'Choose forehead pearls over heavy dangling stones if your wedding is an outdoor morning ceremony in warm weather.',
      ],
      featuredProducts: [
        {
          name: 'Imperial Pearl Sheeshpatti',
          category: 'Accessories',
          price: '₹34,500',
          image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
          link: '/shop',
        },
        {
          name: 'Polki Solitaire Maang Tikka',
          category: 'Accessories',
          price: '₹28,000',
          image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
          link: '/shop?category=earrings',
        },
      ],
    },
  },
  {
    slug: 'the-modern-solah-shringar-16-sacred-adornments',
    title: 'The Modern Solah Shringar: 16 Sacred Bridal Adornments Reimagined',
    subtitle: 'From the crowned Matha Patti to celestial Bichhiyas: tracing the ancient beauty ritual through modern craftsmanship.',
    excerpt: 'Step into the storied tradition of Solah Shringar. Discover how contemporary brides honor all 16 sacred Vedic adornments with curated, lightweight heirlooms that celebrate womanhood.',
    category: 'Behind the Craft',
    readTime: '9 min read',
    publishedAt: 'October 18, 2026',
    author: {
      name: 'Devika Singhania',
      role: 'Atelier Director & Historian',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
    content: {
      intro: 'Rooted in Vedic scriptures and immortalized in medieval temple frescoes, the Solah Shringar is not mere ornamentation—it is a spiritual journey. Each of the 16 adornments honors the moon cycles, awakens divine feminine energy (Shakti), and safeguards the bride across life’s most auspicious passage.',
      sections: [
        {
          heading: '1. The Crown & Forehead: Bindi, Sindoor, Maang Tikka',
          body: 'The Ajna chakra (the third eye between the brows) is honored through the vermilion Sindoor and the jewel-encrusted Tikka. Symbolizing inner wisdom and the union of two souls, modern brides are commissioning miniature dual-tone tikkas set with certified Burmese rubies that carry sacred auspiciousness.',
        },
        {
          heading: '2. The Scent & Sight: Bridal Nath, Karnphool & Haar',
          body: 'The nose ring (Nath) connects to Ayurveda’s reproductive wellness points, while the grand Karnphool (earrings) and Kantha Haar (necklaces) protect the vital energy of speech and the heart chakra. Hand-carved Meenakari on the reverse of each piece ensures the raw metal never irritates delicate bridal skin.',
          quote: '“To wear the Solah Shringar is to wrap yourself in prayer. Every bead of gold is an amulet whispered by generations of women before you.”',
        },
        {
          heading: '3. The Hands & Waist: Hathphool, Chooda, Arsi & Kamarbandh',
          body: 'The hands that pour sacred rice into the Agni flame are adorned with the Hathphool—five delicate rings linked by pearl chains to an articulated wristlet. Around the waist, the sculpted Kamarbandh (waistband) anchors the heavy bridal drape, accentuating the waistline and signifying sovereign grace.',
        },
        {
          heading: '4. The Feet of the Goddess: Payal & Bichhiya',
          body: 'Crafted exclusively in pure silver (as gold is revered as Goddess Lakshmi and traditionally not worn below the waist), the melodious chiming of the Payal announces the arrival of good fortune into the new household.',
        },
      ],
      tips: [
        'Curate your Solah Shringar with dual-tone finishes: warm 22kt yellow gold for temple rituals, paired with antique silver Bichhiyas accented with freshwater pearls.',
        'Rather than buying mass-manufactured bridal sets, commission your Hathphool and Nath to mirror family heirlooms for deeper emotional resonance.',
      ],
    },
  },
  {
    slug: 'the-bridal-nath-masterclass-sizing-comfort',
    title: 'The Bridal Nath Masterclass: Sizing, Pierced vs. Clip-On & Pain-Free Comfort',
    subtitle: 'Why the nose ring is the most emotionally transformative bridal jewel, and how to wear it effortlessly for 8+ hours.',
    excerpt: 'Overcome the fear of nose ring pinches and veil snags. Master the art of selecting the perfect hoop diameter, invisible silicone comfort pads, and hairline weight distribution.',
    category: 'Bridal Styling',
    readTime: '5 min read',
    publishedAt: 'October 12, 2026',
    author: {
      name: 'Rohan Mehra',
      role: 'Master Gemologist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
    content: {
      intro: 'Few bridal ornaments possess the sheer theatrical power of the Nath. The moment a bride clips or slips this crescent of pearls and Polki into place, her reflection transforms. Yet, without proper sizing and balance, an ill-fitted nose ring can cause throbbing cartilage pain and spoil your wedding dinner.',
      sections: [
        {
          heading: 'Pierced vs. Clip-On: Dispelling the Myths',
          body: 'You do not need a nostril piercing to wear a breathtaking bridal nath! High-jewelry clip-on naths today use precision-machined micro-screws lined with medical-grade silicone pads. Unlike cheap spring-clamps that pinch the skin until it goes numb, screw-back mechanisms let you dial in the exact millimeter of pressure required to stay firm without pain.',
        },
        {
          heading: 'Diameter Mathematics: Finding Your Proportion',
          body: 'For delicate, petite faces, a 22mm to 28mm hoop adorned with seed pearls and a solitaire Polki drop provides ethereal charm without obscuring your lips or smile. For grand royal portraits, a 40mm to 50mm Shikargah or Rajputi Nath with a sweeping triple-strand pearl chain creates vintage majesty.',
        },
        {
          heading: 'The Hairline Weight Transfer Trick',
          body: 'The real secret to wearing a heavy nath for six hours is the connecting chain (latkan). The chain must be pinned into the hair at an upward 45-degree angle slightly above the ear. This transfers 80% of the hoop’s gravitational pull off the nostril and onto the crown hair pins!',
        },
      ],
      tips: [
        'Practice wearing your nath for 30 minutes during your makeup trial to verify the silicone pad tension.',
        'During the wedding dinner, unhook the nose ring and switch to a delicate micro-stud so you can eat and laugh without bumping your drink.',
        'Always ensure the connecting pearl chain is pinned beneath the dupatta veil, not over it, so head movements don’t tug on your nose.',
      ],
      featuredProducts: [
        {
          name: 'Nathani Heritage Pearl Nose Ring',
          category: 'Accessories',
          price: '₹22,000',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
          link: '/shop',
        },
      ],
    },
  },
  {
    slug: 'the-smart-brides-trousseau-7-pieces-you-will-re-wear',
    title: 'The Smart Bride’s Trousseau: 7 Pieces You Will Actually Re-Wear After the Wedding',
    subtitle: 'Moving past one-time ceremony jewelry into versatile, modular fine jewelry that elevates cocktail sarees, western suits, and galas.',
    excerpt: 'Your bridal jewelry budget should work for your entire lifetime. Discover modular bridal chokers, detachable jhumkas, and versatile bangle stacks that transition seamlessly into everyday luxury.',
    category: 'Wedding Trends',
    readTime: '6 min read',
    publishedAt: 'October 05, 2026',
    author: {
      name: 'Aurelia Varma',
      role: 'Principal Bridal Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
    content: {
      intro: 'Generations of women have watched their mothers’ magnificent bridal sets remain locked away in bank safe deposit lockers, pulled out only once every three years. Today’s modern brides are demanding versatility: high jewelry engineered with modular mechanics that can be deconstructed into contemporary daytime chic.',
      sections: [
        {
          heading: '1. The Modular Detachable Choker',
          body: 'Look for bridal chokers designed with invisible rear hinge pins. On your wedding day, wear the full multi-tier collar with dangling emerald drops. Later, unclip the lower drops to wear a sleek, minimalist gold choker with an ivory pant suit or cocktail gown for a friend’s reception.',
        },
        {
          heading: '2. The 3-in-1 Convertible Jhumka',
          body: 'Traditional bridal jhumkas can weigh 40 grams and feel excessive for dinner dates. Our atelier crafts detachable jhumkas where the bottom bell unhooks, leaving a sparkling solitaire or Polki stud for formal evenings. The bell itself can be threaded onto a silk cord as a delicate boho pendant.',
          quote: '“True luxury is not about buying jewelry for one day—it is about creating heirlooms that accompany you through every milestone of your life.”',
        },
        {
          heading: '3. The Solitaire Emerald Bangle Stack',
          body: 'Instead of purchasing 20 rigid gold-plated glass bangles that break, invest in two solid 18kt hallmarked openable kadas with bezel-set Zambian emeralds. Stack them with your Apple watch or tennis bracelet for effortless boardroom luxury.',
        },
      ],
      tips: [
        'Insist on BIS hallmark certification (750 for 18kt, 916 for 22kt) for all custom trousseau pieces to guarantee exchange and resale value.',
        'Choose neutral gemstone accents—uncut diamonds, pearls, and deep green emeralds complement every color palette from pastel mint to midnight black.',
      ],
      featuredProducts: [
        {
          name: 'Convertible Polki Jhumka Studs',
          category: 'Earrings',
          price: '₹56,000',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
          link: '/shop?category=earrings',
        },
      ],
    },
  },
  {
    slug: 'the-bridal-jewelry-emergency-kit-essential-lifesavers',
    title: 'The Bridal Jewelry Emergency Kit: 9 Lifesavers Every Maid of Honor Must Pack',
    subtitle: 'Backstage secrets that prevent fallen headpieces, drooping earlobes, and loose gemstone claws minutes before the Varmala.',
    excerpt: 'Behind every flawless bride is a vigilant maid of honor equipped with the ultimate jewelry first-aid kit. Discover the nine essential tools that save wedding day portraits from wardrobe malfunctions.',
    category: 'Jewelry Care',
    readTime: '5 min read',
    publishedAt: 'September 26, 2026',
    author: {
      name: 'Dr. Sunita Kulkarni',
      role: 'Archival Conservator & Gemologist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    coverImage: '/product-hover.jpg',
    content: {
      intro: 'When the baraat arrives with thunderous dhol drums and flashbulbs ignite, there is no time to hunt for a missing earring stopper or fix a tilted matha patti. High temperatures, bridal sweat, hugging relatives, and heavy dupattas subject fine jewelry to extreme physical stress. Here is the backstage emergency kit used by celebrity bridal dressers.',
      sections: [
        {
          heading: '1. Lobe Wonder Earring Support Patches',
          body: 'Heavy 40-gram chandbalis can drag earlobes down, causing intense burning pain and unflattering drooping in profile shots. Transparent, hypo-allergenic adhesive patches applied behind the earlobe bear 70% of the earring’s weight, keeping your lobes upright and pain-free until midnight.',
        },
        {
          heading: '2. Extra Silicone Bell Backings & Golden Jump Rings',
          body: 'Traditional screw-on earring backs can easily fall into carpet pile during rushed makeup changes. Keep a pouch of snug-fitting silicone bullet stoppers and a pair of mini needle-nose pliers to instantly tighten loose dori loops and jump rings.',
        },
        {
          heading: '3. Anti-Tarnish Microfiber Cloth & Turmeric Neutralizer',
          body: 'During the sacred rituals, haldi (turmeric) paste and sindoor powder can splash onto pristine Kundan foil or pearl surfaces. Never use wet baby wipes! The alcohol degrades gem foil. Instead, gently blot with a dry microfiber optical cloth to lift stains without moisture damage.',
        },
      ],
      tips: [
        'Pack two spare gold zari dori cords in your kit in case someone accidentally cuts or snaps a necklace thread while cutting tags.',
        'Keep a tube of clear, skin-safe eyelash adhesive; it is the gentlest way to anchor stubborn side chains of a matha patti against forehead sweat.',
        'Store all jewelry in zip-lock airtight bags inside velvet pouches until 10 minutes before dressing to prevent perfume mist oxidation.',
      ],
    },
  },
];
