import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Card = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllProducts();
    }, []);

    if (!store.allProducts || store.allProducts.length === 0) {
        return <p>Cargando productos...</p>;
    }

    return (
        <div className="container-fluid-center justify-content-center mt-5 mb-5 row col-lg-6 col-md-6 col-sm-12">
            <div className="container-fluid-center justify-content-center row col-md-6 col-sm-6 gap-3">
                {store.allProducts.slice(0, 3).map((product, index) => (
                    <div key={index} className="card text-center red-border" style={{ width: "18rem" }}>
                        <Link to={`/detail/${product.id}`} className="text-decoration-none text-dark">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title red-text">{product.name}</h5>
                                <p className="card-text">{product.price}€</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="container-fluid-center justify-content-center row col-md-6 col-sm-6 gap-3">
                {store.allProducts.slice(3, 6).map((product, index) => (
                    <div key={index} className="card text-center red-border" style={{ width: "18rem" }}>
                        <Link to={`/detail/${product.id}`} className="text-decoration-none text-dark">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title red-text">{product.name}</h5>
                                <p className="card-text">{product.price}€</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;

