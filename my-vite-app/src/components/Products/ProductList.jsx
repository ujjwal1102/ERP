import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
