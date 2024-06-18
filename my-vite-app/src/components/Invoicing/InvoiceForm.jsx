import React, { useState, useEffect } from 'react';
import { getSalesOrders, addInvoice } from '../../api';

const InvoiceForm = () => {
    const [saleOrderId, setSaleOrderId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [saleOrders, setSaleOrders] = useState([]);

    useEffect(() => {
        fetchSaleOrders();
    }, []);

    const fetchSaleOrders = async () => {
        const response = await getSalesOrders();
        setSaleOrders(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invoice = { sale_order: saleOrderId, due_date: dueDate };
        await addInvoice(invoice);
        setSaleOrderId('');
        setDueDate('');
    };

    return (
        <div>
            <h2>Add Invoice</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Sale Order</label>
                    <select value={saleOrderId} onChange={(e) => setSaleOrderId(e.target.value)}>
                        <option value="">Select Sale Order</option>
                        {saleOrders.map((order) => (
                            <option key={order.id} value={order.id}>{order.id}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Due Date</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <button type="submit">Add Invoice</button>
            </form>
        </div>
    );
};

export default InvoiceForm;
