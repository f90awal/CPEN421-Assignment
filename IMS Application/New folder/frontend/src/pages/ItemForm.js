import React, { useState, useEffect } from 'react';
import api from '../config/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './ItemForm.css';

export default function ItemForm() {
  const [form, setForm] = useState({ name: '', sku: '', description: '', quantity: 0, price: 0 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadItem();
    }
  }, [id]);

  async function loadItem() {
    try {
      setLoading(true);
      const res = await api.get(`/api/products/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load item');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('auth-change'));
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (id) {
        await api.put(`/api/products/${id}`, form);
      } else {
        await api.post('/api/products', form);
      }
      navigate('/inventory');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to save item');
    } finally {
      setSaving(false);
    }
  }

  function updateField(k, v) {
    setForm({ ...form, [k]: v });
  }

  if (loading) {
    return (
      <div className="item-form-container">
        <div className="loading-state">
          <span className="spinner"></span>
          <p>Loading item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="item-form-container">
      <div className="form-header">
        <div>
          <h1>{id ? 'Edit Item' : 'Add New Item'}</h1>
          <p className="subtitle">{id ? 'Update item details' : 'Create a new inventory item'}</p>
        </div>
        <Link to="/inventory" className="btn btn-secondary">
          ← Back to Inventory
        </Link>
      </div>

      <div className="form-card">
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="item-form">
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="name">Product Name *</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                placeholder="e.g., Widget A"
                required
                disabled={saving}
              />
            </div>

            <div className="input-group">
              <label htmlFor="sku">SKU (Stock Keeping Unit) *</label>
              <input
                id="sku"
                type="text"
                value={form.sku}
                onChange={e => updateField('sku', e.target.value.toUpperCase())}
                placeholder="e.g., WIDGET-A"
                required
                disabled={saving}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={e => updateField('description', e.target.value)}
              placeholder="Enter product description..."
              disabled={saving}
              rows="4"
            />
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                id="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={e => updateField('quantity', Number(e.target.value))}
                placeholder="0"
                required
                disabled={saving}
              />
            </div>

            <div className="input-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => updateField('price', Number(e.target.value))}
                placeholder="0.00"
                required
                disabled={saving}
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/inventory" className="btn btn-secondary" disabled={saving}>
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                id ? 'Update Item' : 'Create Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
