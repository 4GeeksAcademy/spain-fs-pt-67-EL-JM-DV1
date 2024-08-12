import React, { useContext } from "react";
import PetsHome from "../../img/PetsHome.jpg";
import "../../styles/home.css";
import Card from "./cardhome";


export const Home = () => {
    return (
        <div className="#">
            <div className="container-fluid-center d-flex justify-content-center">
                <h1><strong>Baxter Shop</strong></h1>
            </div>

            <div className="container-fluid-center d-flex justify-content-center">
                <img src={PetsHome} alt="Pets Home" />
            </div>

            <div className="container-fluid-center d-flex justify-content-center">
                <Card />  {/* Ya no pasamos el arreglo de tarjetas */}
            </div>
        </div>
    );
};

