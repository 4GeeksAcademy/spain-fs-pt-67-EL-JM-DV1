import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logoroedores from "../../img/logoroedores.jpg";

const RoedorCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllProducts(); // Obtenemos todos los productos
    }, []);

    // Filtrar productos que pertenezcan a la categoría "roedores"
    const roedorProducts = store.allProducts.filter(product => product.category === "roedores");

    if (roedorProducts.length === 0) {
        return <p>No hay productos en la categoría "roedores".</p>;
    }

    return (
        <div className="container">
            <div className="text-center mb-4">
                <h1><strong></strong></h1>
                <img className="w-25" src={logoroedores} alt="Roedores" />
            </div>
            <div className="row">
                {roedorProducts.map((product, index) => (
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

export default RoedorCard;
