import React from "react";
const Orders = () => {
  const orders = [
    { id: 1, date: "2022-01-01", total: 29.99 },
    { id: 2, date: "2022-01-15", total: 49.99 },
    { id: 3, date: "2022-02-01", total: 19.99 },
    { id: 4, date: "2022-02-15", total: 39.99 },
  ];

  return (
    <div className="container my-4">
      <h1 className="text-center">Order History</h1>
      <div className="list-group">
        {orders.map((order) => (
          <button
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            key={order.id}
          >
            <div>
              <div>Order ID: {order.id}</div>
              <div>Date: {order.date}</div>
            </div>
            <div>Total: INR {order.total.toFixed(2)}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Orders;
