import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";
import { useNavigate, useParams } from "react-router-dom";

export const Details = () => {
    const { store, actions } = useContext(Context);
    const { id_product } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(""); // Estado para a mensagem

    const handleBuy = () => {
        const token = localStorage.getItem('token');
        if (token) {
            if (actions.addToKart(store.productDetails, token)) {
                setMessage("¡Producto añadido al carrito con éxito!");
            } else {
                setMessage("No se pudo añadir el producto al carrito.");
            }
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        actions.getProductDetails(id_product);
    }, [store.cart]);

    const goToCart = () => {
        navigate('/carrinho'); // Navega para a página do carrinho
    };

    return (
        <div className="container" style={{ minHeight: '500px' }}>
            <div className="card mb-3 mt-5 mx-auto border-0" style={{ width: '800px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={store.productDetails.image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title red-text">{store.productDetails.name}</h5>
                            <p className="card-text">{store.productDetails.description}</p>
                            <p className="card-text">{store.productDetails.price}€<small className="text-body-secondary"></small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center gap-3"> 
                <button type="button" className="btn special-btn" onClick={handleBuy}>Añadir al carrito</button>
            </div>
            {message && (
                <div className="alert alert-info mt-3 text-center" role="alert">
                    {message}
                </div>
            )}
        </div>
    );
};
