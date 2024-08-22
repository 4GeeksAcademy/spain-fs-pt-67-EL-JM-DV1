import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const User = () => {
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

    const handleCloseSession = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div>
            <div className="my-1 d-flex justify-content-end">
                <button type="button" className="btn special-btn2" onClick={handleCloseSession}>Cerrar sesión</button>
            </div>

            <div className="container" style={{ 'minHeight': '500px' }}>
                <div className="text-center mb-5 red-text">
                    <h1>Bienvenido!</h1>
                    <h2>Aqui puedes ver tu lista de pedidos:</h2>
                </div>

                <div className="container" style={{ 'maxWidth': '500px' }}>
                    {
                        store.orderList.length > 0 ? store.orderList.map((order, index) => (
                            <ul className="list-group mx-auto" key={index}>
                                <li className="list-group-item red-border my-1">
                                    <Link to={`/order/${order.id}`} className="text-decoration-none text-dark">
                                        Número del pedido: #{order.id} - Precio total: {order.total_amount}€
                                    </Link>
                                </li>
                            </ul>
                        )) : <h3 className="text-center red-text">Todavía no hay ningun pedido!</h3>
                    }
                </div>
            </div>
        </div>
    );
};