import React, { useContext } from "react";
import { Context } from "../store/appContext";
import cardacana from "../../img/cardacana.png";
import cardbravery from "../../img/cardbravery.png";
import carddogchow from "../../img/carddogchow.png";
import cardhills from "../../img/cardhills.png";
import cardultima from "../../img/cardultima.png";
import cardwhiskas from "../../img/cardwhiskas.png";
import PetsHome from "../../img/PetsHome.jpg";
import "../../styles/home.css";
import Card from "./cardhome";  // Importa tu nuevo componente Card

export const Home = () => {
    const { store, actions } = useContext(Context);

    const cards = [
        {
            image: cardacana,
            title: "Pet Shop",
            text: "All about pet care products.",
            link: "#"
        },
        {
            image: cardbravery,
            title: "Dog Care",
            text: "Best care products for your dog.",
            link: "#"
        },
        {
            image: carddogchow,
            title: "Cat Care",
            text: "Find the perfect products for your cat.",
            link: "#"
        },
        {
            image: cardhills,
            title: "Bird Care",
            text: "Everything you need for your bird.",
            link: "#"
        },
        {
            image: cardultima,
            title: "Fish Care",
            text: "Aquarium supplies for your fish.",
            link: "#"
        },
        {
            image: cardwhiskas,
            title: "Reptile Care",
            text: "Find the best for your reptile.",
            link: "#"
        }
    ];

    return (
        <div className="#">
            <div className="container-fluid-center d-flex justify-content-center">                
                <h1><strong>Baxter Shop</strong></h1>
            </div>

            <div className="container-fluid-center d-flex justify-content-center">
                <img src={PetsHome} alt="Pets Home" />
            </div>

            <div className="container-fluid-center d-flex justify-content-center">
                <Card cards={cards} />  {/* Pasa el arreglo de tarjetas */}
            </div>
        </div>
    );
};
