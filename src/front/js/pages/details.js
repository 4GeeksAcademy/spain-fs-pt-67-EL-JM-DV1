import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css"
import { useNavigate, useParams } from "react-router-dom";

export const Details = () => {
    const { store, actions } = useContext(Context);
    const { id_product } = useParams();
    const navigate = useNavigate();

    const handleBuy = () => {
        const token = localStorage.getItem('token');
        if (token) {
            if (actions.addToKart(store.productDetails, token)) {
                alert("Producto añadido a la cesta");
            } else {
                alert("El producto no ha sido añadido a la cesta");
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        actions.getProductDetails(id_product);
    }, []);

    return (
        <div className="container" style={{ 'minHeight': '500px'}}>
            <div className="card mb-3 mt-5 mx-auto border-0" style={{ 'width': '800px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={store.productDetails.image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title red-text">{store.productDetails.name}</h5>
                            <p className="card-text">{store.productDetails.description}</p>
                            <p className="card-text">{store.productDetails.price}<small className="text-body-secondary"></small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn special-btn" onClick={handleBuy}>Comprar</button>
            </div>
        </div>
    );
};