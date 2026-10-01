const { query } = require('../config/db');

exports.getAdminStats = async (req, res) => {
  try {
    const [products] = await query('SELECT * FROM products');
    const [orders] = await query('SELECT * FROM orders');

    const productList = products || [];
    const orderList = orders || [];

    const totalProducts = productList.length;
    const totalOrders = orderList.length;
    const pendingOrders = orderList.filter((o) => o.status === 'Pending').length;
    const completedOrders = orderList.filter((o) => o.status === 'Delivered').length;
    const totalRevenue = orderList.reduce((acc, o) => acc + Number(o.total_amount || 0), 0);

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: Number(totalRevenue.toFixed(2)),
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ message: 'Failed to calculate stats' });
  }
};
