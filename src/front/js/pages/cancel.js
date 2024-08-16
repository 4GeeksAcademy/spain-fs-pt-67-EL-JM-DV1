import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css"
import { useNavigate } from "react-router-dom";

export const Cancel = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            actions.getAllOrders(token);
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ 'minHeight': '500px' }}>
            <div className="text-center mb-5 red-text">
                <h1>Tu compra ha sido cancelada!</h1>
                <h2>Parece que no completaste el proceso de pago. Si necesitas ayuda o deseas intentarlo nuevamente, por favor vuelve a la página de productos o contáctanos</h2>
            </div>
        </div>
    );
};