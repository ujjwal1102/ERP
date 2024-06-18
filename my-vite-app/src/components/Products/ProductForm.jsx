import React, { useState } from 'react';
import { addProduct } from '../../api';

const ProductForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newProduct = {
                name,
                description,
                price: parseFloat(price),
                stock_quantity: parseInt(stockQuantity),
                category,
            };

            const response = await addProduct(newProduct);
            // onAdd(response.data); // Pass newly added product to parent component
            // Clear form fields after successful submission
            setName('');
            setDescription('');
            setPrice('');
            setStockQuantity('');
            setCategory('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Description:</label>
                    <textarea
                        id="productDescription"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Price:</label>
                    <input
                        type="number"
                        id="productPrice"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productStockQuantity" className="form-label">Stock Quantity:</label>
                    <input
                        type="number"
                        id="productStockQuantity"
                        className="form-control"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">Category:</label>
                    <input
                        type="text"
                        id="productCategory"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
