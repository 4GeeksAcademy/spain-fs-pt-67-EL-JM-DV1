import React, { useContext, useEffect } from "react";



export const CardGatos = ({ nombre,descripcion,imagen,precio }) => {
    return (
        <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={imagen} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-danger">{nombre}</h5>
                    <p className="card-text">
                    {descripcion}</p>
                    <p className="d-flex justify-content-center text-primary">
                    <h3>{precio}</h3>
                    </p>
                    <a href="#" className=" d-flex justify-content-center btn btn-success purchase-button" title="comprar" aria-label="Comprar">
                     <span className="">Comprar</span>
                    </a>
                </div>
            </div>
        </div>
    );
};