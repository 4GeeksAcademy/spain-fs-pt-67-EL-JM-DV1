import React, { useContext } from "react";
import logogato from "../../img/logogato.jpg";
import { CardGatos } from "./CardGatos";
import { Context } from "../store/appContext";

export const Aves = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="d-flex justify-content-center my-4">
                <h1><strong>Gatos</strong></h1>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <img className="w-50" src={logogato} alt="gatos" />
            </div>
            {/* Tarjetas de gatos */}
            <div className="row">
                {store.allGatos && store.allAves.length > 0 ? (
                    store.allGatos.map((gato, index) => (
                        <CardAves key={index} nombre={gato.nombre} descripcion={gato.descripcion} imagen={gato.imagen} precio={gato.precio}/>
                    ))
                ) : (
                    <div className="d-flex justify-content-center">
                        <p>No hay gatos disponibles</p>
                    </div>
                )}
            </div>
        </div>
    );
};