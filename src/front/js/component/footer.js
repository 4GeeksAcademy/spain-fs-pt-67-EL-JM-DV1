import React, { Component } from "react";

export const Footer = () => (
	<div className="footer mt-auto py-3 text-center">


		<section id="seccion-contacto" className="">
			<div id="seccion-contactos">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path fill="#FF5A63" fill-opacity="1"
						d="M0,160L40,170.7C80,181,160,203,240,192C320,181,400,139,480,117.3C560,96,640,96,720,117.3C800,139,880,181,960,181.3C1040,181,1120,139,1200,138.7C1280,139,1360,181,1400,202.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
					</path>
				</svg>
			</div>
		</section>

		<footer className="w-100 d-flex align-items-center justify-content-center flex-wrap" target="blank">
			<div>
				<p className="fs-5 text-ligth px-3 pt-3"> <strong> Baxter Shop </strong> &copy; Todos los Derechos Reservados 2024</p>
			</div>
			<div id="iconos">
				<a href="https://es-es.facebook.com/"><i className="bi bi-facebook"></i></a>
				<a href="https://www.instagram.com/"><i className="bi bi-instagram"></i></a>
				<a href="https://www.twitter.com/"><i className="bi bi-twitter"></i></a>
			</div>
  		</footer>
	</div>
);
