import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const getCustomers = () => axios.get(`${API_BASE_URL}customers/`);
export const addCustomer = (customer) => axios.post(`${API_BASE_URL}customers/`, customer);
export const updateCustomer = (id, customer) => axios.put(`${API_BASE_URL}customers/${id}/`, customer);
export const deleteCustomer = (id) => axios.delete(`${API_BASE_URL}customers/${id}/`);

export const getSalesOrders = () => axios.get(`${API_BASE_URL}sales/sale/orders/`);
export const addSalesOrder = (order) => axios.post(`${API_BASE_URL}sales/sale/orders/`, order);
export const updateSalesOrder = (id, order) => axios.put(`${API_BASE_URL}sales/sale/orders/${id}/`, order);
export const deleteSalesOrder = (id) => axios.delete(`${API_BASE_URL}sales/sale/orders/${id}/`);

export const getSalesOrderLines = () => axios.get(`${API_BASE_URL}sales/sale/orders/line/`);
export const addSalesOrderLine = (orderLine) => axios.post(`${API_BASE_URL}sales/sale/orders/line/`, orderLine);
export const updateSalesOrderLine = (id, orderLine) => axios.put(`${API_BASE_URL}sales/sale/orders/line/${id}/`, orderLine);
export const deleteSalesOrderLine = (id) => axios.delete(`${API_BASE_URL}sales/sale/orders/line/${id}/`);
export const calculation = (data) => axios.post(`${API_BASE_URL}sales/calculation/`,data);


export const getInvoices = () => axios.get(`${API_BASE_URL}invoices/`);
export const addInvoice = (invoice) => axios.post(`${API_BASE_URL}invoices/`, invoice);
export const updateInvoice = (id, invoice) => axios.put(`${API_BASE_URL}invoices/${id}/`, invoice);
export const deleteInvoice = (id) => axios.delete(`${API_BASE_URL}invoices/${id}/`);

export const getProducts = () => axios.get(`${API_BASE_URL}products/`);
export const addProduct = (product) => axios.post(`${API_BASE_URL}products/`, product);
export const updateProduct = (id, product) => axios.put(`${API_BASE_URL}products/${id}/`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}products/${id}/`);
