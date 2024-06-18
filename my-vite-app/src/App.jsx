import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CustomerList from './components/Customers/CustomerList';
import CustomerForm from './components/Customers/CustomerForm';
import SalesOrderList from './components/Sales/SalesOrderList';
import SalesOrderForm from './components/Sales/SalesOrderForm';
import InvoiceList from './components/Invoicing/InvoiceList';
import InvoiceForm from './components/Invoicing/InvoiceForm';
import ProductForm from './components/Products/ProductForm';
import ProductList from './components/Products/ProductList';

function App() {
    return (
        <Router>
            <div className="container">
                <h1 className="my-4">ERP</h1>
                <nav className="mb-4">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link">Customers</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sales" className="nav-link">Sales Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/invoices" className="nav-link">Invoices</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link">Products</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/customers" element={
                        <div>
                            <h2>Customers</h2>
                            <CustomerForm />
                            <CustomerList />
                        </div>
                    } />
                    <Route path="/sales" element={
                        <div>
                            <h2>Sales Orders</h2>
                            <SalesOrderForm />
                            <SalesOrderList />
                        </div>
                    } />
                    <Route path="/invoices" element={
                        <div>
                            <h2>Invoices</h2>
                            <InvoiceForm />
                            <InvoiceList />
                        </div>
                    } />
                    <Route path="/products" element={
                        <div>
                            <h2>Products</h2>
                            <ProductForm />
                            <ProductList />
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
