import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const Dashboardadmin = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get('/api/inventory')
      .then(res => setInventory(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (orderId, status) => {
    axios.put('/api/orders/update-status', { orderId, status })
      .then(() => alert('Order status updated!'))
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard-container">
      <video className="background-video" autoPlay loop muted>
        <source src="path_to_your_pizza_video.mp4" type="video/mp4" />
      </video>

      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Threshold</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.stock}</td>
              <td>{item.threshold}</td>
              <td>
                <select onChange={(e) => updateStatus(item._id, e.target.value)}>
                  <option value="Received">Received</option>
                  <option value="In Kitchen">In Kitchen</option>
                  <option value="Sent to Delivery">Sent to Delivery</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboardadmin;
