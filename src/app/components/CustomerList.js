import React, { useEffect, useState } from 'react'
import apiService from '../services/apiService'

const CustomerList = () => {

  const [customers, setCustomers] = useState([]);
  const [custId, setCustId] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    const data = await apiService.getAllCustomers()
    setCustomers(data);

  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomers({ ...customers, [name]: value })
  }

  const handlSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await apiService.updateCustomer(custId.id, customers);
      setEditing(false);
      setCustId(null);
    }
    else {
      await apiService.createCustomer(customers);
    }
    setCustomers({ name: '', description: '' })
    fetchCustomers();
  }

  const handleDelete = async (id) => {
    await apiService.deleteCustomer(id);
    fetchCustomers();
  }

  const handleEdit = (entity) => {
    setEditing(true);
    setCustId(customers.id);
    setCustomers({ name: customers.name, description: customers.description });
  };
  return (
    <>
      <h1>CustomerList</h1>
      <form onSubmit={handlSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customers.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={customers.description}
          onChange={handleInputChange}
        />
        <button type="submit">{editing ? 'Update' : 'Add'} Entity</button>
      </form>
      <ul>
        {customers.map((entity) => (
          <li key={entity.id}>
            {entity.name} - {entity.description}
            <button onClick={() => handleEdit(entity)}>Edit</button>
            <button onClick={() => handleDelete(entity.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </>
  )
}

export default CustomerList