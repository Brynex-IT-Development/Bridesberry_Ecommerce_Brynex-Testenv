const baseUrl = 'http://localhost:7001/api';

async function main() {
  console.log('Logging in...');
  const loginRes = await fetch(`${baseUrl}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@zorucci.com', password: 'Admin@123' })
  });
  if (!loginRes.ok) {
    console.error('Login failed', await loginRes.text());
    return;
  }
  const loginData = await loginRes.json();
  const token = loginData.accessToken;
  console.log('Login successful');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Get or create category
  let categoryRes = await fetch(`${baseUrl}/categories`, { headers });
  let categories = await categoryRes.json();
  let categoryId = '';
  
  if (categories && categories.length > 0) {
    categoryId = categories[0].id;
  } else {
    console.log('Creating fake category...');
    const createCatRes = await fetch(`${baseUrl}/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'Fine Jewelry',
        slug: 'fine-jewelry',
        description: 'Exquisite fine jewelry',
        isActive: true,
        sortOrder: 1
      })
    });
    const newCat = await createCatRes.json();
    categoryId = newCat.id;
  }
  
  console.log('Using category:', categoryId);

  const fakeProducts = [
    {
      name: 'Diamond Solitaire Ring',
      sku: 'RNG-DIA-001',
      slug: 'diamond-solitaire-ring',
      shortDescription: 'Classic diamond solitaire ring',
      description: 'A beautiful 1 carat diamond solitaire ring set in 18k white gold.',
      sellingPrice: 1999,
      mrp: 2500,
      categoryId: categoryId,
      status: 'ACTIVE',
      featured: true,
      newArrival: true,
      bestSeller: true,
      trackInventory: true,
      initialStock: 10,
      minStock: 2,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=2070&auto=format&fit=crop',
          altText: 'Diamond Ring',
          isPrimary: true,
          sortOrder: 1
        }
      ],
      variants: [
        {
          name: 'Size 6',
          sku: 'RNG-DIA-001-S6',
          sellingPrice: 1999,
          isActive: true,
          initialStock: 5
        },
        {
          name: 'Size 7',
          sku: 'RNG-DIA-001-S7',
          sellingPrice: 1999,
          isActive: true,
          initialStock: 5
        }
      ]
    },
    {
      name: 'Gold Chain Necklace',
      sku: 'NCK-GLD-002',
      slug: 'gold-chain-necklace',
      shortDescription: '18k solid gold chain',
      description: 'Elegant 18k solid gold chain necklace, perfect for everyday wear.',
      sellingPrice: 599,
      mrp: 750,
      categoryId: categoryId,
      status: 'ACTIVE',
      featured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1599643478524-fb506462a418?q=80&w=2069&auto=format&fit=crop',
          altText: 'Gold Necklace',
          isPrimary: true,
          sortOrder: 1
        }
      ],
      variants: [
        {
          name: '18 Inch',
          sku: 'NCK-GLD-002-18',
          sellingPrice: 599,
          isActive: true,
          initialStock: 20
        }
      ]
    },
    {
      name: 'Pearl Drop Earrings',
      sku: 'EAR-PRL-003',
      slug: 'pearl-drop-earrings',
      shortDescription: 'Freshwater pearl drop earrings',
      description: 'Stunning freshwater pearl drop earrings with sterling silver hooks.',
      sellingPrice: 150,
      mrp: 200,
      categoryId: categoryId,
      status: 'ACTIVE',
      bestSeller: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop',
          altText: 'Pearl Earrings',
          isPrimary: true,
          sortOrder: 1
        }
      ],
      variants: [
        {
          name: 'Standard',
          sku: 'EAR-PRL-003-STD',
          sellingPrice: 150,
          isActive: true,
          initialStock: 30
        }
      ]
    },
    {
      name: 'Sapphire Tennis Bracelet',
      sku: 'BRC-SAP-004',
      slug: 'sapphire-tennis-bracelet',
      shortDescription: 'Blue sapphire tennis bracelet',
      description: 'Exquisite tennis bracelet featuring brilliant blue sapphires.',
      sellingPrice: 1250,
      mrp: 1500,
      categoryId: categoryId,
      status: 'ACTIVE',
      newArrival: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop',
          altText: 'Sapphire Bracelet',
          isPrimary: true,
          sortOrder: 1
        }
      ],
      variants: [
        {
          name: '7 Inch',
          sku: 'BRC-SAP-004-7',
          sellingPrice: 1250,
          isActive: true,
          initialStock: 8
        }
      ]
    }
  ];

  for (const product of fakeProducts) {
    console.log(`Creating product: ${product.name}`);
    const res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(product)
    });
    if (!res.ok) {
      console.error(`Failed to create ${product.name}`, await res.text());
    } else {
      console.log(`Success: ${product.name}`);
    }
  }
}

main().catch(console.error);
