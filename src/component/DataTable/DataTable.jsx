import React, { useState, useEffect } from 'react';
import './Datatable.css';
import SearchBar from '../SearchBar';
import Pagination from '../Pagination';
import AddCustomerModal from '../AddCustomerModal';

const data = [
  // Your initial data here, similar to what you have in the screenshot
  // Ensure each object has a unique id
];

const DataTable = () => {
    const [customers, setCustomers] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      if (searchTerm === '') {
        setCustomers(data);
      } else {
        setCustomers(data.filter(customer =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      }
    }, [searchTerm]);
  
    const toggleSelect = (id) => {
      setSelectedIds(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    };
  
    const handleSelectAll = (event) => {
      if (event.target.checked) {
        setSelectedIds(customers.map(customer => customer.id));
      } else {
        setSelectedIds([]);
      }
    };
  
    const addCustomer = (customer) => {
      setCustomers(prevCustomers => [...prevCustomers, customer]);
    };
  
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = customers.slice(indexOfFirstRow, indexOfLastRow);
  
    return (
      <div className="data-table">
        <div className="data-table-header">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button className="add-customer-btn" onClick={() => setShowModal(true)}>+ Add Customer</button>
        </div>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} /></th>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Rate</th>
              <th>Balance</th>
              <th>Deposit</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((customer, index) => (
              <tr key={customer.id} className={selectedIds.includes(customer.id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(customer.id)}
                    onChange={() => toggleSelect(customer.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.description}</td>
                <td>{customer.status}</td>
                <td>{customer.rate}</td>
                <td>{customer.balance}</td>
                <td>{customer.deposit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRows={customers.length}
          rowsPerPage={rowsPerPage}
        />
        <AddCustomerModal
          showModal={showModal}
          setShowModal={setShowModal}
          addCustomer={addCustomer}
        />
      </div>
    );
  };
  
  export default DataTable;