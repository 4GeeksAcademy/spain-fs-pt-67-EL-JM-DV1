import React, { useContext } from "react";
import Logoave from "../../img/Logoave.jpg";
import { CardAves } from "./cardAves";
import { Context } from "../store/appContext";

export const Aves = () => {
    const { store, actions } = useContext(Context)
    console.log(store.allAves[1]);

    return (
        <div className="#">
            <div className="container-fluid-center d-flex justify-content-center">
                <h1><strong>Aves</strong></h1>
            </div>

            <div className="container-fluid-center d-flex justify-content-center">
                <img src={Logoave} alt="aves" />
            </div>

            {store.allAves.map((ave, index) => {
                console.log(ave);
                console.log(index);
                return (
                    <CardAves key={index} nombre={ave} />
                )

            })}
        </div>



    );
};