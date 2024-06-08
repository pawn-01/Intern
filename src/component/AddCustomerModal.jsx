import React, { useState } from 'react';
import './AddCustomerModal.css';

const AddCustomerModal = ({ showModal, setShowModal, addCustomer }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');
  const [rate, setRate] = useState('');
  const [balance, setBalance] = useState('');
  const [deposit, setDeposit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: Date.now(), // Simple unique ID for the demo purpose
      name,
      description,
      status,
      rate: parseFloat(rate),
      balance: parseFloat(balance),
      deposit: parseFloat(deposit),
    };
    addCustomer(newCustomer);
    setShowModal(false);
    setName('');
    setDescription('');
    setStatus('Open');
    setRate('');
    setBalance('');
    setDeposit('');
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="Paid">Paid</option>
            <option value="Inactive">Inactive</option>
            <option value="Due">Due</option>
          </select>
          <label>Rate</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} required />
          <label>Balance</label>
          <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} required />
          <label>Deposit</label>
          <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} required />
          <button type="submit">Add</button>
          <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
