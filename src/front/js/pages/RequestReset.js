import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.BACKEND_URL + `/request-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("If the email is registered, you will receive a password reset email shortly.");
        setEmail('');
        setError('');
        // Optionally, navigate to a different page, e.g., login
        // navigate("/login");
      } else {
        setError(data.message || "Error sending reset email.");
        setMessage('');
      }
    } catch (error) {
      setError("There was an error processing your request.");
      setMessage('');
    }
  };

  return (
    <div className="container mt-5" style={{ 'maxWidth': '500px' }}>
      <h2 className='red-text'>Recuperar Contraseña</h2>
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
        {message && (
          <div className="alert alert-success mt-3">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
        <div className='d-flex justify-content-center'>
          <button type="submit" className="btn special-btn2 mt-3">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default RequestReset;
