import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
<<<<<<< HEAD
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
=======
	return (
		<nav className="navbar navbar-expand-lg navbar bg-danger border-bottom border-body">
			<div className="container-fluid">
				<a className="navbar-brand text-white" href="#"><strong> Baxter Shop </strong></a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
						<li className="nav-item">
						<a className="nav-link active text-white" aria-current="page" href="#"> Perros </a>
						</li>
						<li className="nav-item">
						<a className="nav-link text-white" href="#"> Gatos </a>
						</li>	
						<li className="nav-item">
						<a className="nav-link text-white" href="#"> Roedores </a>
						</li>
						<li className="nav-item">
						<a className="nav-link text-white" href="#"> Peces </a>
						</li>
						<li className="nav-item">
						<a className="nav-link text-white" href="#"> Aves </a>
						</li>										
					</ul>
					<form className="d-flex gap-3" role="search">
						<button className="btn btn-outline-light" type="submit"> Carrito </button>
						<button className="btn btn-outline-light" type="submit"> Usuario </button>
					</form>
				</div>
			</div>
		</nav>
	);
>>>>>>> 491b94db8f72906f32034aa0660e1f52e32eadaf
};
