import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
};
