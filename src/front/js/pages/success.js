import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css"
import { useNavigate } from "react-router-dom";

export const Success = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            actions.success(token);
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ 'minHeight': '500px' }}>
            <div className="text-center mb-5 red-text">
                <h1>Gracias por tu compra!</h1>
                <h2>Tu pago se ha realizado con éxito</h2>
                <h3>Puedes consultar el estado de tu pedido en tu cuenta</h3>
            </div>
        </div>

    );
};