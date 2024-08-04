import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                 
                    <Link to="/demo">
                        <button className="btn btn-primary">Check the Context in action</button>
                    </Link>
                    
                    <Link to="/cart"> {/* Adicionando link para a página do carrinho */}
                        <button className="btn btn-success ml-3">Carrito</button>
                    </Link>
                    
                    <Link to="/pay"> {/* Adicionando link para a página de pagamento */}
                        <button className="btn btn-warning ml-3">Pagar</button>
                    </Link>
                    
                    <div className="dropdown d-inline-block ml-3">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user"></i> 
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link to="/login" className="dropdown-item">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="dropdown-item">Registro</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
