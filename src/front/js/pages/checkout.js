import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../../styles/index.css";

const Checkout = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    useEffect(() => {
        token = localStorage.getItem('token');

        if (token) {
            actions.getAllKartItems(token);
        } else {
            navigate('/login');
        }
    }, [store.orderItems]);

    const handleBuy = () => {
        actions.checkout(store.orderStatus.id, store.orderStatus.total_amount);
    };

    return (
        <div className="container" style={{ 'minHeight': '500px' }}>
            <div className="text-center mb-5 red-text">
                <h1>Carrito</h1>
                <h2>Precio total: {store.orderStatus.total_amount || 0}€</h2>
            </div>

            <div className="container" style={{ 'maxWidth': '500px' }}>
                {
                    store.orderItems.length > 0 ? store.orderItems.map((item, index) => (
                        <ul className="list-group mx-auto" key={item.id}>
                            <li className="list-group-item red-border red-text my-1">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={item.product_image} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-8">
                                        {item.product_name}: <span className='text-dark'>{item.quantity} x {item.price}€</span>
                                    </div>
                                </div>

                                <div className="my-1 d-flex justify-content-end">
                                    <button className="btn special-btn2" onClick={() => actions.removeItemKart(token, item.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        </ul>
                    )) : <h3 className="text-center red-text">El carrito está vacio!</h3>
                }
            </div>

            {
                store.orderStatus.total_amount > 0 && (
                    <div className="my-1 d-flex justify-content-center">
                        <button className='btn special-btn' role="link" onClick={handleBuy}>
                            Pagar
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default Checkout;