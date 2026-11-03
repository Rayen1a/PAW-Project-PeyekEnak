const orders = [];

exports.getAllOrders = () => orders;
exports.addOrder = (orderData) => {
    const newOrder = { id: orders.length + 1, ...orderData, createdAt: new Date().toISOString() };
    orders.push(newOrder);
    return newOrder;
};