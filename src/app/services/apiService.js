import react from 'react';

import axios from 'axios'

const API_URL = 'http://localhost:5001'

export const getAllCustomers = async () => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axios.get(`${API_URL}/customers/${id}`);
  return response.data;
}

export const createCustomer = async (customer) => {
  const response = await axios.post(`${API_URL}/customers`, customer);
  return response.data;
}

export const updateCustomer = async (id, customer) => {
  const response = await axios.put(`${API_URL}/customers/${id}`, customer);
  return response.data;
}







