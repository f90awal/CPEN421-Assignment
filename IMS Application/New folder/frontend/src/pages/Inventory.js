import React, { useEffect, useState } from 'react';
import api from '../config/api';
import { Link, useNavigate } from 'react-router-dom';
import './Inventory.css';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const res = await api.get('/api/products');
      setItems(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load inventory items');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('auth-change'));
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/api/products/${id}`);
      setItems(items.filter(i => i._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete item');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  }

  if (loading) {
    return (
      <div className="inventory-container">
        <div className="loading-state">
          <span className="spinner"></span>
          <p>Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <div>
          <h1>Inventory Management</h1>
          <p className="subtitle">Manage your products and stock levels</p>
        </div>
        <div className="header-actions">
          <Link to="/inventory/new" className="btn btn-primary">
            <span>+</span> Add New Item
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No items in inventory</h3>
          <p>Get started by adding your first product</p>
          <Link to="/inventory/new" className="btn btn-primary">
            Add First Item
          </Link>
        </div>
      ) : (
        <div className="inventory-card">
          <div className="table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Description</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td className="font-medium">{item.name}</td>
                    <td className="sku-cell">{item.sku}</td>
                    <td className="description-cell">{item.description || '-'}</td>
                    <td className="text-right">
                      <span className={`quantity-badge ${item.quantity === 0 ? 'out-of-stock' : item.quantity < 10 ? 'low-stock' : ''}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="text-right price-cell">${parseFloat(item.price).toFixed(2)}</td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <Link to={`/inventory/edit/${item._id}`} className="btn btn-sm btn-secondary">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="inventory-footer">
            <p>Total Items: <strong>{items.length}</strong></p>
            <p>Total Value: <strong>${items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
