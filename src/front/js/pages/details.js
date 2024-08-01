import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useParams } from "react-router-dom";

export const Details = () => {
    const { store, actions } = useContext(Context);
    const { id_product } = useParams();

    useEffect(() => {
        actions.getProductDetails(id);
    }, []);

    return (
        <div className="card mb-3" style="max-width: 540px;">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{store.productDetails.name}</h5>
                        <p className="card-text">{store.productDetails.description}</p>
                        <p className="card-text"><small className="text-body-secondary"></small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};