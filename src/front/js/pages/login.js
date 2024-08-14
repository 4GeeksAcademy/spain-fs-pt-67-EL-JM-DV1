import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para armazenar mensagem de erro
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.login(email, password);
        if (success) {
            navigate("/user"); // Altere o redirecionamento para a página de usuário
        } else {
            // Atualiza o estado de erro para exibir a mensagem na tela
            setError("No existe una cuenta con ese e-mail. Por favor, revisa si está correcto o regístrate creando una cuenta.");
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Usúario:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contrasenha:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}
                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
            <br />
            <Link to="/register">
                <button className="btn btn-secondary">Registro</button>
            </Link>
        </div>
    );
};
