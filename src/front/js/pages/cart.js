import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { store, actions } = useContext(Context);
    const cartItems = store.cart || [];

    const handleRemove = (itemId) => {
        actions.removeFromCart(itemId);
    };

    return (
        <div className="container">
            <h1 className="my-4">Carrito</h1>
            {cartItems.length === 0 ? (
                <p>Su carrito está vacío</p>
            ) : (
                <ul className="list-group">
                    {cartItems.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name} 
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button className="btn btn-primary mt-3" onClick={() => actions.clearCart()}>
                Limpiar Carrito
            </button>
            <Link to="/pay"> {/* Adicionando link para a página de pagamento */}
                <button className="btn btn-warning mt-3">Pagar</button>
            </Link>
        </div>
    );
};

export default Cart;
