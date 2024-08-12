import React, { useContext, useEffect } from "react";



export const CardAves = ({ nombre,descripcion,imagen }) => {
    return (
        <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={imagen} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">
                    {descripcion}
                    </p>
                    <a href="#" className="btn btn-primary">Comprar</a>
                </div>
            </div>
        </div>
    );
};

// Uso del componente CardAves en el mapeo
//<div className="row">
//{store.allAves.map((ave, index) => (
//<CardAves key={index} nombre={ave.nombre} />
//))}
//</div>



