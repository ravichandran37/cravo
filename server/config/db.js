const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

let pool = null;
let useFallback = false;

// In-memory / file fallback state in case MySQL server isn't running locally yet
const fallbackStore = {
  admins: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@cravo.com',
      password: '$2a$10$5aHW6X8xXhuCe5IKDsU9/e5WzhdhBrwtTmLO87If47wI41/PsmzsW', // admin123
      created_at: new Date().toISOString(),
    },
  ],
  products: [
    {
      id: 1,
      name: 'Cravo Black Truffle Double Smash Burger',
      description: 'Two smashed Angus beef patties, melted aged gouda & gruyere cheese, sautéed wild forest mushrooms, crispy frizzled shallots, and luscious black truffle aioli on toasted brioche.',
      price: 18.50,
      category: 'Burgers',
      image: '/images/truffle_burger_8.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Smoked Applewood Bacon BBQ Burger',
      description: 'Thick-cut crispy glazed applewood bacon, melted sharp Vermont cheddar cheese, sweet caramelized onion jam, and smoky chipotle BBQ glaze on artisan sesame seed bun.',
      price: 16.95,
      category: 'Burgers',
      image: '/images/juicy_gourmet_bacon_barbecue_burger_with_thic_15.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Artisanal Double Angus Cheeseburger',
      description: 'Double Angus beef patties, bubbling sharp cheddar, heirloom tomatoes, fresh butter leaf lettuce, house pickles, and secret signature Cravo sauce on golden brioche.',
      price: 15.50,
      category: 'Burgers',
      image: '/images/gourmet_double_smashed_beef_cheeseburger_with_7.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Wood-Fired Neapolitan Margherita Pizza',
      description: 'Leopard-spotted charred artisan crust, crushed San Marzano tomato sauce, fresh buffalo mozzarella pearls, sweet basil leaves, and cold-pressed olive oil drizzle.',
      price: 17.00,
      category: 'Pizza',
      image: '/images/margherita_pizza_16.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Hot Honey Artisan Pepperoni Pizza',
      description: 'Crispy cupping artisanal pepperoni, fresh torn whole milk mozzarella, spicy Mike\'s hot honey drizzle, organic oregano flakes, and wood-fired blistered crust.',
      price: 19.50,
      category: 'Pizza',
      image: '/images/pepperoni_pizza_17.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 6,
      name: 'Nashville Hot Crispy Chicken Sandwich',
      description: 'Buttermilk-brined fried chicken breast dipped in fiery Nashville cayenne chili oil, topped with garlic crema slaw and thick crinkle-cut brine pickles on potato bun.',
      price: 15.25,
      category: 'Chicken',
      image: '/images/chicken_18.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 7,
      name: 'Smoked Honey-Glazed BBQ Chicken Wings',
      description: '8 jumbo hickory-smoked wings tossed in sweet sticky wildflower honey BBQ sauce, garnished with toasted sesame seeds, scallions, and creamy blue cheese dip.',
      price: 14.00,
      category: 'Chicken',
      image: '/images/platter_of_8_sticky_sweet_honey_glazed_smoked_19.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 8,
      name: 'Golden Nashville Hot Chicken Tenders',
      description: 'Crisp double-battered chicken tenderloins seasoned with Southern spices, served with tangy comeback dipping sauce and house garlic dill pickles.',
      price: 13.50,
      category: 'Chicken',
      image: '/images/golden_crisp_deep_fried_spicy_nashville_hot_c_10.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 9,
      name: 'Parmesan & Herb White Truffle Fries',
      description: 'Hand-cut Belgian russet fries tossed with aromatic white truffle oil, freshly grated Parmigiano-Reggiano snow, and chopped flat-leaf Italian parsley.',
      price: 9.50,
      category: 'Snacks',
      image: '/images/truffle_fries_11.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 10,
      name: 'Belgian Chocolate Molten Lava Cake',
      description: 'Warm decadent Belgian dark chocolate cake with a molten ganache center, served with a velvety scoop of Madagascar vanilla bean gelato and dusted with pure cocoa.',
      price: 11.00,
      category: 'Desserts',
      image: '/images/decadent_individual_warm_belgian_chocolate_mo_21.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 11,
      name: 'Blood Orange Hazy IPA Craft Beer',
      description: 'Frosted tall glass of double dry-hopped hazy IPA with tropical citrus notes, thick frothy head, and fresh blood orange garnish (6.8% ABV).',
      price: 8.50,
      category: 'Drinks',
      image: '/images/beverage_27.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 12,
      name: 'Wild Hibiscus & Citrus Iced Craft Tea',
      description: 'Cold-brewed wild organic hibiscus flowers, steeped with fresh citrus zest, pomegranate essence, and crushed mint over artisan crystal ice.',
      price: 5.75,
      category: 'Drinks',
      image: '/images/beverage_6.jpg',
      available: 1,
      created_at: new Date().toISOString(),
    },
  ],
  orders: [
    {
      id: 1001,
      customer_name: 'David Miller',
      customer_phone: '(212) 555-8912',
      customer_address: '742 Evergreen Terrace, Apt 4B',
      total_amount: 46.50,
      status: 'Pending',
      created_at: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 1002,
      customer_name: 'Jessica Vance',
      customer_phone: '(212) 555-4301',
      customer_address: '120 West 44th St, Suite 12',
      total_amount: 32.25,
      status: 'Preparing',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 1003,
      customer_name: 'Marcus Sterling',
      customer_phone: '(212) 555-7788',
      customer_address: '55 Hudson Yards, Fl 28',
      total_amount: 50.50,
      status: 'Delivered',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  order_items: [
    { id: 1, order_id: 1001, product_id: 1, quantity: 2, price: 18.50 },
    { id: 2, order_id: 1001, product_id: 9, quantity: 1, price: 9.50 },
    { id: 3, order_id: 1002, product_id: 4, quantity: 1, price: 17.00 },
    { id: 4, order_id: 1002, product_id: 6, quantity: 1, price: 15.25 },
    { id: 5, order_id: 1003, product_id: 5, quantity: 2, price: 19.50 },
    { id: 6, order_id: 1003, product_id: 10, quantity: 1, price: 11.00 },
  ],
};

async function initDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'cravo_db';

  try {
    // 1. Attempt initial connection to MySQL server
    const initConn = await mysql.createConnection({
      host,
      port: Number(port),
      user,
      password,
    });

    // Create database if not exists
    await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await initConn.end();

    // 2. Create connection pool to the database
    pool = mysql.createPool({
      host,
      port: Number(port),
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test pool connection
    const testConn = await pool.getConnection();
    testConn.release();

    console.log(`[DB] Connected successfully to MySQL database "${database}" on ${host}:${port}!`);

    // Ensure tables exist
    await createTablesIfNotExist();
    return true;
  } catch (err) {
    console.warn(`[DB Notice] Could not connect to MySQL server at ${host}:${port} (${err.code || err.message}).`);
    console.log(`[DB Info] Running with embedded database fallback so all features, APIs, and Admin actions work immediately!`);
    console.log(`[DB Info] To use MySQL: Ensure MySQL is running and set your credentials in server/.env.`);
    useFallback = true;
    return false;
  }
}

async function createTablesIfNotExist() {
  if (useFallback || !pool) return;

  const queries = [
    `CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(191) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image VARCHAR(500) DEFAULT NULL,
      available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50) NOT NULL,
      customer_address TEXT NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
  ];

  for (const q of queries) {
    await pool.query(q);
  }

  // Seed default admin if empty
  const [adminRows] = await pool.query('SELECT COUNT(*) as count FROM admins');
  if (adminRows[0].count === 0) {
    const adminSql = `INSERT INTO admins (username, email, password) VALUES (?, ?, ?)`;
    await pool.query(adminSql, [
      'admin',
      'admin@cravo.com',
      '$2a$10$5aHW6X8xXhuCe5IKDsU9/e5WzhdhBrwtTmLO87If47wI41/PsmzsW',
    ]);
    console.log('[DB] Seeded default administrator account (admin / admin123)');
  }

  // Seed default products if empty
  const [productRows] = await pool.query('SELECT COUNT(*) as count FROM products');
  if (productRows[0].count === 0) {
    for (const p of fallbackStore.products) {
      await pool.query(
        'INSERT INTO products (name, description, price, category, image, available) VALUES (?, ?, ?, ?, ?, ?)',
        [p.name, p.description, p.price, p.category, p.image, p.available]
      );
    }
    console.log(`[DB] Seeded ${fallbackStore.products.length} default food products into MySQL!`);
  }
}

// Unified query wrapper supporting both MySQL pool and Fallback store
async function query(sql, params = []) {
  if (!useFallback && pool) {
    return pool.query(sql, params);
  }

  // Fallback simulator for standard operations
  const upper = sql.trim().toUpperCase();

  // 1. SELECT admins by username / email
  if (upper.startsWith('SELECT') && upper.includes('FROM ADMINS')) {
    if (params.length > 0) {
      const match = fallbackStore.admins.filter(
        (a) => a.username === params[0] || a.email === params[0]
      );
      return [match];
    }
    return [fallbackStore.admins];
  }

  // 2. SELECT products
  if (upper.startsWith('SELECT') && upper.includes('FROM PRODUCTS')) {
    if (upper.includes('WHERE ID =')) {
      const id = Number(params[0]);
      const found = fallbackStore.products.filter((p) => p.id === id);
      return [found];
    }
    let list = [...fallbackStore.products];
    return [list];
  }

  // 3. INSERT product
  if (upper.startsWith('INSERT INTO PRODUCTS')) {
    const newId = Math.max(...fallbackStore.products.map((p) => p.id), 0) + 1;
    const [name, description, price, category, image, available] = params;
    const newProd = {
      id: newId,
      name,
      description,
      price: Number(price),
      category,
      image,
      available: available ? 1 : 0,
      created_at: new Date().toISOString(),
    };
    fallbackStore.products.unshift(newProd);
    return [{ insertId: newId }];
  }

  // 4. UPDATE product
  if (upper.startsWith('UPDATE PRODUCTS')) {
    const id = Number(params[params.length - 1]);
    const prod = fallbackStore.products.find((p) => p.id === id);
    if (prod) {
      if (params.length === 2 && upper.includes('AVAILABLE = ?')) {
        prod.available = params[0] ? 1 : 0;
      } else {
        const [name, description, price, category, image, available] = params;
        prod.name = name;
        prod.description = description;
        prod.price = Number(price);
        prod.category = category;
        prod.image = image;
        prod.available = available ? 1 : 0;
      }
    }
    return [{ affectedRows: prod ? 1 : 0 }];
  }

  // 5. DELETE product
  if (upper.startsWith('DELETE FROM PRODUCTS')) {
    const id = Number(params[0]);
    const idx = fallbackStore.products.findIndex((p) => p.id === id);
    if (idx !== -1) fallbackStore.products.splice(idx, 1);
    return [{ affectedRows: idx !== -1 ? 1 : 0 }];
  }

  // 6. SELECT orders
  if (upper.startsWith('SELECT') && upper.includes('FROM ORDERS')) {
    if (upper.includes('WHERE ID =')) {
      const id = Number(params[0]);
      const order = fallbackStore.orders.filter((o) => o.id === id);
      return [order];
    }
    return [[...fallbackStore.orders]];
  }

  // 7. SELECT order_items
  if (upper.startsWith('SELECT') && upper.includes('FROM ORDER_ITEMS')) {
    if (upper.includes('ORDER_ID = ?')) {
      const orderId = Number(params[0]);
      const items = fallbackStore.order_items
        .filter((oi) => oi.order_id === orderId)
        .map((oi) => {
          const prod = fallbackStore.products.find((p) => p.id === oi.product_id);
          return {
            ...oi,
            product_name: prod ? prod.name : 'Unknown Item',
            product_image: prod ? prod.image : null,
          };
        });
      return [items];
    }
    return [fallbackStore.order_items];
  }

  // 8. INSERT order
  if (upper.startsWith('INSERT INTO ORDERS')) {
    const newId = Math.max(...fallbackStore.orders.map((o) => o.id), 1000) + 1;
    const [name, phone, address, total, status] = params;
    const newOrder = {
      id: newId,
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      total_amount: Number(total),
      status: status || 'Pending',
      created_at: new Date().toISOString(),
    };
    fallbackStore.orders.unshift(newOrder);
    return [{ insertId: newId }];
  }

  // 9. INSERT order_items
  if (upper.startsWith('INSERT INTO ORDER_ITEMS')) {
    const newId = Math.max(...fallbackStore.order_items.map((oi) => oi.id), 0) + 1;
    const [order_id, product_id, quantity, price] = params;
    const newItem = {
      id: newId,
      order_id: Number(order_id),
      product_id: Number(product_id),
      quantity: Number(quantity),
      price: Number(price),
    };
    fallbackStore.order_items.push(newItem);
    return [{ insertId: newId }];
  }

  // 10. UPDATE order status
  if (upper.startsWith('UPDATE ORDERS SET STATUS = ?')) {
    const [status, id] = params;
    const order = fallbackStore.orders.find((o) => o.id === Number(id));
    if (order) order.status = status;
    return [{ affectedRows: order ? 1 : 0 }];
  }

  // 11. STATS counts
  if (upper.includes('COUNT(*) AS TOTAL_PRODUCTS')) {
    return [[{ total_products: fallbackStore.products.length }]];
  }

  return [[]];
}

module.exports = {
  initDatabase,
  query,
  getPool: () => pool,
  isFallback: () => useFallback,
};
