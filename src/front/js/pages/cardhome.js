import React from "react";

const Card = ({ cards }) => {
    return (
        <div className="container-fluid-center justify-content-center mt-5 mb-5 row col-lg-6 col-md-6 col-sm-12">
            <div className="container-fluid-center justify-content-center row col-md-6 col-sm-6 gap-3">
                {cards.slice(0, 3).map((card, index) => (
                    <div key={index} className="card text-center" style={{ width: "18rem" }}>
                        <img src={card.image} className="card-img-top" alt={card.title} />
                        <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.text}</p>
                            <a href={card.link} className="btn btn-danger text-center w-50">Comprar</a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="container-fluid-center justify-content-center row col-md-6 col-sm-6 gap-3">
                {cards.slice(3, 6).map((card, index) => (
                    <div key={index} className="card text-center" style={{ width: "18rem" }}>
                        <img src={card.image} className="card-img-top" alt={card.title} />
                        <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.text}</p>
                            <a href={card.link} className="btn btn-danger text-center w-50">Comprar</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
