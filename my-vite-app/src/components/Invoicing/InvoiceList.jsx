import React, { useEffect, useState } from 'react';
import { getInvoices, deleteInvoice } from '../../api';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        const response = await getInvoices();
        setInvoices(response.data);
    };

    const handleDelete = async (id) => {
        await deleteInvoice(id);
        fetchInvoices();
    };

    return (
        <div>
            <h2>Invoices</h2>
            <ul>
                {invoices.map((invoice) => (
                    <li key={invoice.id}>
                        {invoice.sale_order.customer.name} - {invoice.total_amount}
                        <button onClick={() => handleDelete(invoice.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoiceList;
