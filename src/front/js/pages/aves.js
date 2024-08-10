import React, { useContext } from "react";
import Logoave from "../../img/Logoave.jpg";

export const Aves = () => {
    return (
        <div className="#">
            <div className="container-fluid-center d-flex justify-content-center">
                <h1><strong>Aves</strong></h1>
            </div>

            <div className="container-fluid-center d-flex justify-content-center">
                <img src={Logoave} alt="aves" />
            </div>
        </div>



    );
};