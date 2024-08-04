import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../store/appContext";

export const Product = () => {
    const { store, setProducts } = useContext(Context);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
                setProducts(response.data.results);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        fetchProducts();
    }, [setProducts]);

    return (
        <div className="product-list">
            {store.products.length ? (
                store.products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <form action="/create-checkout-session" method="POST">
                          <button type="submit">Checkout</button>
                        </form>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};
