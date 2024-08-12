import React, { useContext } from "react";
import Logoave from "../../img/Logoave.jpg";
import { CardAves } from "./CardAves";
import { Context } from "../store/appContext";

export const Aves = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="d-flex justify-content-center my-4">
                <h1><strong>Aves</strong></h1>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <img className="w-25" src={Logoave} alt="aves" />
            </div>
            {/* Tarjetas de Aves */}
            <div className="row">
                {store.allAves && store.allAves.length > 0 ? (
                    store.allAves.map((ave, index) => (
                        <CardAves key={index} nombre={ave.nombre} descripcion={ave.descripcion} imagen={ave.imagen} precio={ave.precio}/>
                    ))
                ) : (
                    <div className="d-flex justify-content-center">
                        <p>No hay aves disponibles</p>
                    </div>
                )}
            </div>
        </div>
    );
};