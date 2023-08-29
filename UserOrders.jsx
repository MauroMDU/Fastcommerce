import React, { useState, useEffect } from 'react';
import { api, apiUrl, endpoints } from '../utils/api.js';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  console.log(orders);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(`${apiUrl}payment/webhook`);
    
    eventSource.onmessage = (event) => {
      console.log('Webhook notification received:', event.data);
      const updatedOrder = JSON.parse(event.data);
      updateOrderStatus(updatedOrder);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await api.get(apiUrl + endpoints.getUserOrders.replace(':user_id', user._id));
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  const updateOrderStatus = (updatedOrder) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order._id === updatedOrder._id ? updatedOrder : order
    ));
  };

  const renderPaymentStatus = (status) => {
    switch (status) {
      case 'approved':
        return <span className="text-green-500">Approved</span>;
      case 'pending':
        return <span className="text-yellow-500">Pending</span>;
      case 'rejected':
        return <span className="text-red-500">Rejected</span>;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  return (
    <div className="lg:text-lg bg-white text-black flex flex-col items-center  p-6 min-h-[500px] w-[80vw] rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Payment Status</th>
            <th>Shipping Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.order_number}</td>
              <td>{renderPaymentStatus(order.payment_status)}</td>
              <td>{order.shipping_status}</td>
              {/*<td>${order.total.toFixed(2)}</td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
