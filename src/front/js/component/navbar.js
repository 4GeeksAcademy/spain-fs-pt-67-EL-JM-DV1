import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar bg-danger border-bottom border-body">
			<div className="container-fluid">
				<Link className="navbar-brand text-white" to="/"><strong> Baxter Shop </strong></Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
						<li className="nav-item">
							<Link className="nav-link active text-white" aria-current="page" to="/perros"> Perros </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/gatos"> Gatos </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/roedores"> Roedores </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/peces"> Peces </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/aves"> Aves </Link>
						</li>
					</ul>
					<form className="d-flex gap-3" role="search">
						<Link className="btn btn-outline-light position-relative" to="/checkout">
							Carrito
							{store.cart.length > 0 && (
								<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
									{store.cart.length}
									<span className="visually-hidden">unread messages</span>
								</span>
							)}
						</Link>
						<Link className="btn btn-outline-light" to="/user"> Mi Cuenta </Link>
					</form>
				</div>
			</div>
		</nav>
	);
};

