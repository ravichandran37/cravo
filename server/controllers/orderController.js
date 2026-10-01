const { query } = require('../config/db');

exports.createOrder = async (req, res) => {
  try {
    const { customer_name, customer_phone, customer_address, total_amount, items } = req.body;

    if (!customer_name || !customer_phone || !customer_address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Customer details and at least one order item are required' });
    }

    const orderTotal = total_amount !== undefined ? parseFloat(total_amount) : 0;

    // 1. Insert order
    const [orderResult] = await query(
      'INSERT INTO orders (customer_name, customer_phone, customer_address, total_amount, status) VALUES (?, ?, ?, ?, ?)',
      [customer_name, customer_phone, customer_address, orderTotal, 'Pending']
    );

    const orderId = orderResult.insertId;

    // 2. Insert order items
    for (const item of items) {
      await query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity || 1, parseFloat(item.price)]
      );
    }

    res.status(201).json({
      id: orderId,
      message: 'Order created successfully',
      status: 'Pending',
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const [orders] = await query('SELECT * FROM orders ORDER BY id DESC');

    // Attach items to each order
    const populated = await Promise.all(
      (orders || []).map(async (order) => {
        const [items] = await query(
          `SELECT oi.*, p.name as product_name, p.image as product_image 
           FROM order_items oi 
           LEFT JOIN products p ON oi.product_id = p.id 
           WHERE oi.order_id = ?`,
          [order.id]
        );
        return {
          ...order,
          items: items || [],
        };
      })
    );

    res.json(populated);
  } catch (err) {
    console.error('Error retrieving orders:', err);
    res.status(500).json({ message: 'Failed to retrieve orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const [orders] = await query('SELECT * FROM orders WHERE id = ?', [id]);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orders[0];
    const [items] = await query(
      `SELECT oi.*, p.name as product_name, p.image as product_image 
       FROM order_items oi 
       LEFT JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [order.id]
    );

    res.json({
      ...order,
      items: items || [],
    });
  } catch (err) {
    console.error('Error retrieving order:', err);
    res.status(500).json({ message: 'Failed to retrieve order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    await query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, id: Number(id), status });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
