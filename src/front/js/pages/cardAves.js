import React from "react";


export const CardAves = ({ nombre }) => {
    console.log("cartAves",nombre);

    return (
        <div className="container-item">
            <p>{nombre}</p>

        </div>

    );
}
