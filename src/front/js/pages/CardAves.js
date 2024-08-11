import React, { useContext, useEffect } from "react";



export const CardAves = ({ nombre }) => {
    return (
        <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src="https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw5cb45609/images/snack_cotorras_vitakraft_barritas_miel_VIT21479_M.jpg?sw=780&sh=780&q=85" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">
                    Snack para loros australianos Vitakraft con barritas de miel, cereales y semillas horneadas para crear una chuchería crujiente, dulce y sabrosa.
                    </p>
                    <a href="#" className="btn btn-primary">Comprar</a>
                </div>
            </div>
        </div>
    );
};

// Uso del componente CardAves en el mapeo
//<div className="row">
//{store.allAves.map((ave, index) => (
//<CardAves key={index} nombre={ave.nombre} />
//))}
//</div>



