import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css"
import { useNavigate, useParams } from "react-router-dom";

export const Order = () => {
    const { store, actions } = useContext(Context);
    const { orderid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            actions.getAllItems(token, orderid);
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
                    <h2>Aqui puedes ver los productos de tu pedido:</h2>
                    <h3>Pedido: #{store.orderStatus.id} - Estado del Pedido: {store.orderStatus.order_status}</h3>
                    <h3>Precio total: {store.orderStatus.total_amount}€</h3>
                </div>

                <div className="container" style={{ 'maxWidth': '500px' }}>
                    {
                        store.orderItems.length > 0 ? store.orderItems.map((item, index) => (
                        <ul className="list-group mx-auto" key={item.id}>
                            <li className="list-group-item red-border red-text my-1">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={item.product_image} class="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-8">
                                        {item.product_name}: <span className="text-dark">{item.quantity} x {item.price}€</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        )) : <h3 className="text-center red-text">Lo sentimos, no hay ningun producto</h3>
                    }
                </div>
            </div>
        </div>
    );
};