import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logoave from "../../img/logoave.jpg";

const AveCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllProducts(); // Obtenemos todos los productos
    }, []);

    // Filtrar productos que pertenezcan a la categoría "aves"
    const avesProducts = store.allProducts.filter(product => product.category === "perros");

    if (avesProducts.length === 0) {
        return <p>No hay productos en la categoría "aves".</p>;
    }

    return (
        <div className="container-fluid-center justify-content-center mt-5 mb-5 row col-lg-6 col-md-6 col-sm-12">
            <div className="d-flex justify-content-center my-4">
                <h1><strong>aves</strong></h1>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <img className="w-50" src={logoave} alt="aves" />
            </div>
            <div className="container-fluid-center justify-content-center row col-md-6 col-sm-6 gap-3">
                {avesProducts.map((product, index) => (
                    <div key={index} className="card text-center" style={{ width: "18rem" }}>
                        <Link to={`/detail/${product.id}`} className="text-decoration-none text-dark">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title red-text">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AveCard;
