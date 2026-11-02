export const initialSiteData = {
  storeConfig: {
    storeName: "SareeVira",
    tagline: "ETHNIC DRAPES",
    announcement: "✨ Festive Season Sale: Complimentary Silk Care Kit & Free Express Delivery across India | Handwoven Luxury",
    whatsappNumber: "918669851581",
    currency: "₹",
    phoneDisplay: "+91 98765 43210",
    email: "care@sareevira.com",
    address: "Boutique Lane, Heritage Quarter, Mumbai, Maharashtra 400001",
    footerText: "Handcrafted Indian ethnic drapes celebrating tradition, heritage weavers, and modern sophistication.",
    footerCopyright: "© 2026 SareeVira Ethnic Drapes. All rights reserved."
  },
  hero: {
    eyebrow: "TIMELESS DRAPES",
    titlePart1: "Sarees for Every",
    titleAccent: "Occasion",
    description: "A curated collection of authentic handloom and luxury designer sarees that blend ancient weaving traditions with modern grace.",
    primaryCtaText: "Explore Collection",
    primaryCtaLink: "#collections",
    secondaryCtaText: "Discover Our Story",
    secondaryCtaLink: "#story",
    badgeNote: "Thoughtfully selected. Beautifully draped.",
    heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=90"
  },
  trustFeatures: [
    {
      id: "trust-1",
      icon: "Sparkles",
      title: "Curated Handlooms",
      subtitle: "Certified pure weaves from master artisans"
    },
    {
      id: "trust-2",
      icon: "Leaf",
      title: "Pure Silk & Dyes",
      subtitle: "Natural fabrics with silk mark guarantee"
    },
    {
      id: "trust-3",
      icon: "Truck",
      title: "Pan-India Express",
      subtitle: "Dispatched within 24 hours with tracking"
    },
    {
      id: "trust-4",
      icon: "ShieldCheck",
      title: "Personal Styling Support",
      subtitle: "Video call & WhatsApp drape assistance"
    }
  ],
  collections: [
    {
      id: "col-1",
      name: "Paithani Sarees",
      categoryKey: "Paithani",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      tag: "Pure Zari"
    },
    {
      id: "col-2",
      name: "Banarasi Sarees",
      categoryKey: "Banarasi",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85",
      tag: "Heritage"
    },
    {
      id: "col-3",
      name: "Silk Sarees",
      categoryKey: "Silk",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
      tag: "Kanjivaram"
    },
    {
      id: "col-4",
      name: "Designer Organza",
      categoryKey: "Designer",
      image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=900&q=85",
      tag: "Contemporary"
    }
  ],
  products: [
    {
      id: "SR101",
      name: "Royal Peacock Paithani Saree",
      category: "Paithani",
      fabric: "Pure Mulberry Silk",
      colour: "Deep Royal Purple",
      price: 6499,
      mrp: 7999,
      tag: "New Arrival",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      detail: "A regal purple drape adorned with hand-woven peacock pallu motifs and delicate gold zari buttis, crafted for unforgettable family celebrations.",
      inStock: true,
      featured: true,
      specs: {
        length: "5.5 Meters Saree + 0.8 Meter Blouse Piece",
        weave: "Authentic Paithan Tapestry Handloom",
        zari: "Pure Tested Gold Zari (Peacock Motif)",
        blouse: "Matching Unstitched Purple Silk with Zari Border",
        care: "Dry Clean Only",
        origin: "Paithan, Maharashtra"
      },
      gallery: [
        {
          part: "Full Drape",
          title: "Complete Drape & Silhouette",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
          caption: "Full front editorial view showing flow, pleats, and how the purple silk drape settles gracefully."
        },
        {
          part: "Pallu & Peacock Zari",
          title: "Exquisite Peacock Pallu Weave",
          image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
          caption: "Intricate handwoven peacock (Mor) motifs rendered in vibrant silk threads and rich gold zari."
        },
        {
          part: "Border & Pleats",
          title: "Narali Border & Pleat Alignment",
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
          caption: "Distinctive angular coconut (Narali) border pattern providing strong drape definition."
        },
        {
          part: "Blouse Piece & Texture",
          title: "Matching Blouse Fabric & Texture",
          image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=1200&q=85",
          caption: "80cm unstitched pure mulberry silk blouse material featuring coordinating border trims for sleeves."
        }
      ]
    },
    {
      id: "SR102",
      name: "Varanasi Antique Kadwa Banarasi",
      category: "Banarasi",
      fabric: "Katan Silk",
      colour: "Emerald Teal",
      price: 5999,
      mrp: 7499,
      tag: "Bestseller",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
      detail: "Classic Banarasi kadwa weave featuring floral vines and subtle silver-gold border work with rich, jewel-toned luster.",
      inStock: true,
      featured: true,
      specs: {
        length: "5.5 Meters Saree + 0.8 Meter Blouse Piece",
        weave: "Kadwa Handloom Jacquard",
        zari: "Sona-Rupa (Gold & Silver Dual Tone)",
        blouse: "Teal Katan Silk with Floral Zari Sleeve Border",
        care: "Dry Clean Only",
        origin: "Varanasi, Uttar Pradesh"
      },
      gallery: [
        {
          part: "Full Drape",
          title: "Emerald Teal Full Stature View",
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
          caption: "Jewel-toned emerald teal body glowing under natural lighting with rich fall."
        },
        {
          part: "Pallu Craft",
          title: "Varanasi Floral Vines Pallu",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
          caption: "Dense floral jaal woven with individual needle engravings, taking 24 days to hand-loom."
        },
        {
          part: "Border Detailing",
          title: "Dual Tone Zari Border",
          image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
          caption: "Contrasting border edge featuring paisleys and delicate geometric brocade work."
        },
        {
          part: "Fabric Texture",
          title: "Katan Silk Pure Texture Macro",
          image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=1200&q=85",
          caption: "Twisted pure filament silk warp and weft ensuring durability and crease-resistant drape."
        }
      ]
    },
    {
      id: "SR103",
      name: "Temple Border Bridal Kanjivaram",
      category: "Silk",
      fabric: "Pure Kanchipuram Silk",
      colour: "Vermilion Crimson Red",
      price: 8999,
      mrp: 10999,
      tag: "Featured Bridal",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
      detail: "Heirloom bridal drape woven with authentic korvai technique, contrasting temple borders and rich gold thread zari work.",
      inStock: true,
      featured: true,
      specs: {
        length: "5.5 Meters Saree + 0.85 Meter Heavy Blouse",
        weave: "Korvai Interlocking Weave",
        zari: "Heirloom Gold-Dipped Pure Zari",
        blouse: "Crimson Brocade Blouse Piece",
        care: "Professional Dry Clean Only",
        origin: "Kanchipuram, Tamil Nadu"
      },
      gallery: [
        {
          part: "Full Drape",
          title: "Bridal Red Full Drape Silhouette",
          image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
          caption: "Auspicious wedding drape with traditional temple gopuram border patterns."
        },
        {
          part: "Temple Pallu",
          title: "Heavy Zari Bridal Pallu",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
          caption: "Solid gold-thread pallu showcasing mythical mayil (peacock) and yaali motifs."
        },
        {
          part: "Korvai Border",
          title: "Interlocked Korvai Temple Border",
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
          caption: "Traditional three-shuttle korvai technique with temple spikes seamlessly joined."
        },
        {
          part: "Blouse Material",
          title: "Heavy Brocade Matching Blouse",
          image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=1200&q=85",
          caption: "Rich brocade blouse material designed for custom bridal necklines and sleeve borders."
        }
      ]
    },
    {
      id: "SR104",
      name: "Pastel Blush Designer Organza",
      category: "Designer",
      fabric: "Tissue Organza",
      colour: "Powder Blush Pink",
      price: 3499,
      mrp: 4299,
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=1200&q=85",
      detail: "Airy, lightweight tissue organza saree embellished with pearl scalloped edges and hand-painted floral accents for day soirees.",
      inStock: true,
      featured: true,
      specs: {
        length: "5.5 Meters Saree + 0.8 Meter Blouse Piece",
        weave: "Hand-finished Scalloped Organza",
        zari: "Pearl & Muted Champagne Zari Embellishment",
        blouse: "Heavy Raw Silk Blouse Piece Included",
        care: "Dry Clean Only",
        origin: "Contemporary Designer Studio"
      },
      gallery: [
        {
          part: "Full Drape",
          title: "Translucent Pastel Daylight Look",
          image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=1200&q=85",
          caption: "Lightweight ethereal drape with gossamer transparency and soft romantic pink luster."
        },
        {
          part: "Scallop Border",
          title: "Hand-Cut Pearl Scalloped Edges",
          image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
          caption: "Intricately finished scalloped borders adorned with seed pearls and resham embroidery."
        },
        {
          part: "Floral Art",
          title: "Botanical Hand-Painted Pallu Accent",
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
          caption: "Soft watercolor botanical motifs across the pallu edge adding modern couture flair."
        },
        {
          part: "Blouse Pair",
          title: "Raw Silk Contrast Blouse",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
          caption: "Structured raw silk blouse cloth providing opacity and striking visual balance."
        }
      ]
    },
    {
      id: "SR105",
      name: "Chanderi Floral Zari Saree",
      category: "Silk",
      fabric: "Chanderi Silk Cotton",
      colour: "Marigold Yellow",
      price: 4299,
      mrp: 5199,
      tag: "Festive Pick",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      detail: "Lightweight and radiant Chanderi drape with delicate gold bootis and shimmering zari pallu, ideal for haldi or festive pujas.",
      inStock: true,
      featured: false,
      specs: {
        length: "5.5 Meters Saree + 0.8 Meter Blouse Piece",
        weave: "Traditional Chanderi Loom",
        zari: "Fine Gold Thread Bootis",
        blouse: "Matching Yellow Chanderi Silk",
        care: "Dry Clean Only",
        origin: "Chanderi, Madhya Pradesh"
      },
      gallery: [
        {
          part: "Full Drape",
          title: "Radiant Marigold Festive Drape",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
          caption: "Sunny festive hue with a natural sheer sheen perfect for wedding rituals and haldi."
        },
        {
          part: "Booti Work",
          title: "Micro Ashrafi Gold Bootis",
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
          caption: "Coin and floral gold bootis meticulously dotted across the body of the saree."
        },
        {
          part: "Zari Border",
          title: "Subtle Gold Tissue Border",
          image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
          caption: "Narrow, elegant tissue zari border ensuring an airy and non-heavy drape."
        },
        {
          part: "Blouse Fabric",
          title: "Breathable Chanderi Blouse Fabric",
          image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=1200&q=85",
          caption: "Lightweight silk-cotton blend blouse fabric keeping you cool and comfortable all day."
        }
      ]
    },
    {
      id: "SR106",
      name: "Handblock Ajrakh Modal Silk",
      category: "Cotton",
      fabric: "Modal Silk & Cotton",
      colour: "Indigo & Rust",
      price: 3899,
      mrp: 4699,
      tag: "Artisan Weave",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
      detail: "Artisanal hand-block printed drape using natural vegetable dyes, celebrating the timeless heritage of Kutch crafts.",
      inStock: true,
      featured: false,
      specs: {
        length: "5.5 Meters Saree + 0.8 Meter Blouse Piece",
        weave: "Handblock Printed Modal Silk",
        zari: "Zari Lagdi Patta Border",
        blouse: "Indigo Ajrakh Printed Material",
        care: "Gentle Handwash / Dry Clean",
        origin: "Ajrakhpur, Kutch, Gujarat"
      },
      gallery: [
        {
          part: "Full Drape",
          title: "Earth Tone Ajrakh Full Fall",
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=1200&q=85",
          caption: "Rich natural indigo, madder red and earthy black geometric hand-block patterns."
        },
        {
          part: "Pallu Design",
          title: "Lagdi Patta Heritage Pallu",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
          caption: "Signature gold tissue strips (Lagdi Patta) interwoven into traditional Ajrakh blocks."
        },
        {
          part: "Print Detail",
          title: "14-Stage Hand Carved Block Print",
          image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
          caption: "Authentic double-sided resist dyeing using natural river water and wooden blocks."
        },
        {
          part: "Texture & Blouse",
          title: "Flowing Modal Silk Texture",
          image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf70?auto=format&fit=crop&w=1200&q=85",
          caption: "Super buttery and breathable modal silk that wraps like a second skin."
        }
      ]
    }
  ],
  festiveSection: {
    eyebrow: "A LITTLE EXTRA MAGIC",
    titlePart1: "Make every moment",
    titleAccent: "feel extraordinary.",
    description: "Every celebration deserves a saree with soul. Our festive master-editions are woven to help you shine with effortless poise and timeless beauty.",
    ctaText: "Find Your Drape",
    ctaLink: "#arrivals",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85"
  },
  storySection: {
    eyebrow: "THE SAREEVIRA PROMISE",
    titlePart1: "Tradition, with a touch",
    titleAccent: "of modern grace.",
    description: "We work directly with weaver cooperatives across Varanasi, Paithan, and Kanchipuram to preserve generational looms while designing silken silhouettes tailored for the contemporary woman.",
    stat1Number: "1,200+",
    stat1Label: "Artisan Hours Per Weave",
    stat2Number: "100%",
    stat2Label: "Pure Silk Guarantee",
    stat3Number: "15,000+",
    stat3Label: "Happy Drapes Delivered"
  }
};

export const demoAccounts = {
  customer: {
    role: "customer",
    name: "Priya Sharma",
    email: "priya@sareevira.com",
    phone: "+91 98201 12345",
    city: "Mumbai, Maharashtra",
    memberSince: "Oct 2024",
    orders: [
      {
        id: "ORD-8942",
        date: "24 Oct 2024",
        product: "Royal Peacock Paithani Saree",
        price: 6499,
        status: "Delivered",
        trackingId: "BLUEDART-8829103"
      },
      {
        id: "ORD-7193",
        date: "12 Aug 2024",
        product: "Pastel Blush Designer Organza",
        price: 3499,
        status: "Delivered",
        trackingId: "DELHIVERY-449102"
      }
    ]
  },
  admin: {
    role: "admin",
    name: "Vira Patel",
    title: "Store Director & Curator",
    email: "admin@sareevira.com",
    badge: "Super Admin",
    accessLevel: "Full Website Control"
  }
};

export const sampleInquiries = [
  {
    id: "INQ-101",
    customerName: "Ananya Deshmukh",
    phone: "+91 98721 00412",
    product: "Royal Peacock Paithani Saree",
    message: "Is custom matching blouse stitching available with this purple Paithani?",
    status: "Replied on WhatsApp",
    time: "10 mins ago"
  },
  {
    id: "INQ-102",
    customerName: "Meera Krishnan",
    phone: "+91 97112 55921",
    product: "Temple Border Bridal Kanjivaram",
    message: "Need urgent delivery in Chennai before Friday for an engagement ceremony.",
    status: "Dispatched",
    time: "2 hours ago"
  },
  {
    id: "INQ-103",
    customerName: "Sunita Agarwal",
    phone: "+91 98300 44102",
    product: "Varanasi Antique Kadwa Banarasi",
    message: "Can you send a high-res video of the pallu and zari border drape?",
    status: "Video Sent",
    time: "Yesterday"
  }
];
