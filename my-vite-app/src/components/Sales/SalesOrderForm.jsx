import React, { useState, useEffect } from 'react';
import { getCustomers, getProducts, addSalesOrder, calculation } from '../../api'; // Adjust paths as per your project structure

const SalesOrderForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [orderLines, setOrderLines] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [total, setTotal] = useState(0);
    // const [subtotal,setSubtotal] = useState(0)

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await getCustomers(); // Implement getCustomers() function
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await getProducts(); // Implement getProducts() function
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductChange = async (index, productId) => {
        const updatedOrderLines = [...orderLines];
        updatedOrderLines[index].product = productId;
        updatedOrderLines[index].quantity = 1; 
        // const selectedProduct = products.find(product => product.id.toString() === productId.toString());

        // if (selectedProduct) {
        //     updatedOrderLines[index].price = selectedProduct.price;
        //     updatedOrderLines[index].taxes = selectedProduct.price * (taxRate / 100);
        //     updatedOrderLines[index].subtotal = selectedProduct.price + selectedProduct.price * (taxRate / 100);
        // }

        // setOrderLines(updatedOrderLines);

        // // Recalculate totals
        // console.log("handleProductChange",updatedOrderLines)
        // recalculateTotals(updatedOrderLines);

        // Hit the API to calculate
        try {
            const response = await calculation( updatedOrderLines );
            const calculatedLines = response.data;
            console.log(calculatedLines.order_lines)
            setOrderLines(calculatedLines.order_lines);
            setTotal(calculatedLines.total)

            // After receiving the response, recalculate totals again if needed
            // recalculateTotals(calculatedLines);
        } catch (error) {
            console.error('Error calculating order:', error);
        }
    };

    const handleQuantityChange = async (e, index, quantity) => {
        e.preventDefault()
        const updatedOrderLines = [...orderLines];
        updatedOrderLines[index].quantity = quantity;
        const selectedProduct = products.find(product => product.id.toString() === updatedOrderLines[index].product.toString());

        if (selectedProduct) {
            updatedOrderLines[index].subtotal = (selectedProduct.price * quantity) + (selectedProduct.price * quantity * (taxRate / 100));
        }

        setOrderLines(updatedOrderLines);

        // Recalculate totals
        console.log("handleQuantityChange",updatedOrderLines)
        // recalculateTotals(updatedOrderLines);

        // Hit the API to calculate
        try {
            const response = await calculation(updatedOrderLines);
            const calculatedLines = response.data;
            setOrderLines(calculatedLines.order_lines);
            setTotal(calculatedLines.total)

            // After receiving the response, recalculate totals again if needed
            // recalculateTotals(calculatedLines);
        } catch (error) {
            console.error('Error calculating order:', error);
        }
    };

    // const recalculateTotals = (updatedOrderLines) => {
    //     const untaxedAmount = updatedOrderLines.reduce((total, line) => total + line.subtotal, 0);
    //     const totalDiscount = (untaxedAmount * discount) / 100;
    //     const totalAmount = untaxedAmount - totalDiscount;

    //     setTotal(totalAmount);
    // };

    const handleAddOrderLine = () => {
        setOrderLines([...orderLines, { product: '', quantity: 1, price: 0, taxes: 0, subtotal: 0 }]);
    };

    const handleRemoveOrderLine = async (index) => {
        const updatedOrderLines = [...orderLines];
        updatedOrderLines.splice(index, 1);
        setOrderLines(updatedOrderLines);

        // // Recalculate totals
        // console.log("handleRemoveOrderLine",updatedOrderLines)
        // recalculateTotals(updatedOrderLines);

        // Hit the API to calculate
        try {
            const response = await calculation(updatedOrderLines);
            const calculatedLines = response.data;
            setOrderLines(calculatedLines.order_lines);
            setTotal(calculatedLines.total)
            console.log(calculatedLines.total)

            // After receiving the response, recalculate totals again if needed
            // recalculateTotals(calculatedLines);
        } catch (error) {
            console.error('Error calculating order:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            customer: customerId,
            order_lines: orderLines.map(line => ({
                product: line.product,
                quantity: line.quantity,
                taxes: line.taxes,
                price: line.price,
                subtotal: line.subtotal
            })),
            untaxed_amount: orderLines.reduce((total, line) => total + line.subtotal, 0),
            total: total,
            total_discount: (orderLines.reduce((total, line) => total + line.subtotal, 0) * discount) / 100
        };

        try {
            const response = await addSalesOrder(order); // Implement addSalesOrder() function
            console.log('Order created:', response.data); // Log the created order data

            // Reset form fields
            setCustomerId('');
            setOrderLines([]);
            setDiscount(0);
            setTaxRate(0);
            setTotal(0);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-3">Add Sales Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customer" className="form-label">Customer</label>
                    <select id="customer" className="form-select" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
                <table className="table mb-3">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Base Price</th>
                            <th>Taxes</th>
                            <th>Subtotal</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderLines.map((line, index) => (
                            <tr key={index}>
                                <td>
                                    <select className="form-select" value={line.product} onChange={(e) => handleProductChange(index, e.target.value)}>
                                        <option value="">Select Product</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>{product.name}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input type="number" className="form-control" value={line.quantity} onChange={(e) => handleQuantityChange(e,index, parseInt(e.target.value))} />
                                </td>
                                <td>
                                    {line.price ? line.price : ''}
                                </td>
                                <td>
                                    {line.taxes ? line.taxes : ''}
                                </td>
                                <td>
                                    {line.subtotal ? line.subtotal : ''}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveOrderLine(index)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="text-end">Subtotal:</td>
                            <td colSpan="2">{total}</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="text-end">Total Amount:</td>
                            <td colSpan="2">{(total - (total * discount) / 100)}</td>
                        </tr>
                    </tfoot>
                </table>
                {customerId && (
                    <button type="button" className="btn btn-primary" onClick={handleAddOrderLine}>Add Line</button>
                )}
                <div className="mb-3">
                    <label htmlFor="discount" className="form-label">Discount (%)</label>
                    <input id="discount" type="number" className="form-control" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="taxRate" className="form-label">Tax Rate (%)</label>
                    <input id="taxRate" type="number" className="form-control" value={taxRate} onChange={(e) => setTaxRate(parseInt(e.target.value))} />
                </div>
                <button type="submit" className="btn btn-success">Add Sales Order</button>
            </form>
        </div>
    );
};

export default SalesOrderForm;
