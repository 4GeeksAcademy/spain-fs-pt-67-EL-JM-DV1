import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para manejar mensajes de error
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.login(email, password);
        if (success) {
            navigate("/user"); // Redirige a la página de usuario al iniciar sesión con éxito
        } else {
            setError("No existe una cuenta con ese e-mail. Por favor, revisa si está correcto o regístrate creando una cuenta.");
        }
    };

    return (
        <div className="container mt-5" style={{ 'maxWidth': '500px' }}>
            <h2 className="red-text">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control red-border"
                        placeholder="nombre@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control red-border"
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
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn special-btn2 mt-3 "> Login </button>
                </div>
            </form>
            <br />
            <div className="forgot-password d-flex justify-content-center">
                <Link to="/request-reset"><strong> ¿Recuperar Contraseña? </strong></Link>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <Link to="/registro">
                    <button className="btn special-btn2">Registro</button>
                </Link>
            </div>
        </div>
    );
};
