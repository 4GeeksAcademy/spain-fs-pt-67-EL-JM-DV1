import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logopez from "../../img/logopez.jpg";

const DogCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllProducts(); // Obtenemos todos los productos
    }, []);

    // Filtrar productos que pertenezcan a la categoría "Perros"
    const pecesProducts = store.allProducts.filter(product => product.category === "peces");

    if (pecesProducts.length === 0) {
        return <p>No hay productos en la categoría "Peces".</p>;
    }

    return (
        <div className="container">
            <div className="text-center mb-4">
                <h1><strong></strong></h1>
                <img className="w-25" src={logopez} alt="Peces" />
            </div>
            <div className="row">
                {pecesProducts.map((product, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <Link to={`/detail/${product.id}`} className="text-decoration-none text-dark">
                            <div className="card h-100 red-border">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title red-text">{product.name}</h5>
                                    <p className="card-text">{product.price}€</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DogCard;
