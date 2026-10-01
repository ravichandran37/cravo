const { query } = require('../config/db');

exports.getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let sql = 'SELECT * FROM products';
    const params = [];
    const conditions = [];

    if (category && category !== 'All') {
      conditions.push('LOWER(category) = LOWER(?)');
      params.push(category);
    }

    if (search && search.trim()) {
      conditions.push('(LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?))');
      params.push(`%${search.trim()}%`);
      params.push(`%${search.trim()}%`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY id ASC';

    const [rows] = await query(sql, params);
    
    // In fallback mode or raw query, ensure array
    let products = Array.isArray(rows) ? rows : [];
    if (category && category !== 'All' && products.length > 0) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim() && products.length > 0) {
      const q = search.trim().toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
    }

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await query('SELECT * FROM products WHERE id = ?', [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    if (!name || price === undefined || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const avail = available === undefined ? 1 : (available ? 1 : 0);

    const [result] = await query(
      'INSERT INTO products (name, description, price, category, image, available) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description || '', parseFloat(price), category, image || null, avail]
    );

    const newId = result.insertId;
    const [createdRows] = await query('SELECT * FROM products WHERE id = ?', [newId]);

    res.status(201).json(createdRows[0] || { id: newId, name, description, price, category, image, available: avail });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image, available } = req.body;

    const [existing] = await query('SELECT * FROM products WHERE id = ?', [id]);
    if (!existing || existing.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const current = existing[0];
    const newName = name !== undefined ? name : current.name;
    const newDesc = description !== undefined ? description : current.description;
    const newPrice = price !== undefined ? parseFloat(price) : current.price;
    const newCat = category !== undefined ? category : current.category;
    const newImg = image !== undefined ? image : current.image;
    const newAvail = available !== undefined ? (available ? 1 : 0) : current.available;

    await query(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ?, available = ? WHERE id = ?',
      [newName, newDesc, newPrice, newCat, newImg, newAvail, id]
    );

    const [updated] = await query('SELECT * FROM products WHERE id = ?', [id]);
    res.json(updated[0] || { id, name: newName, description: newDesc, price: newPrice, category: newCat, image: newImg, available: newAvail });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
