import React, { useEffect, useState } from 'react';
import { getSalesOrders, deleteSalesOrder } from '../../api';

const SalesOrderList = () => {
    const [salesOrders, setSalesOrders] = useState([]);

    useEffect(() => {
        fetchSalesOrders();
    }, []);

    const fetchSalesOrders = async () => {
        const response = await getSalesOrders();
        setSalesOrders(response.data);
    };

    const handleDelete = async (id) => {
        await deleteSalesOrder(id);
        fetchSalesOrders();
    };

    return (
        <div>
            <h2>Sales Order List</h2>
            <ul>
                {salesOrders.map(order => (
                    <li key={order.id}>
                        Order #{order.id} - ${order.total_amount}
                        <button onClick={() => handleDelete(order.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SalesOrderList;
