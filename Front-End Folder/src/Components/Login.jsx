import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true; // Allow cookies in requests

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); // Reset error
        setLoading(true); // Start loading

        // Send POST request to backend for login
        axios.post('https://ifx-networks-1.onrender.com/api/auth/login', values, { withCredentials: true })
            .then(response => {
                if (response.data.status === 'success') {
                     localStorage.setItem("accessToken", response.data.access_token);
                    navigate('/dashboard'); // Redirige al dashboard en caso de éxito
                } else {
                    setError("Error en el inicio de sesión"); // Muestra un error genérico si el estado no es 'success'
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setError(err.response.data.error || 'Inicio de sesión fallido');
                } else {
                    setError('Error de conexión con el servidor');
                }
                console.error("Error de inicio de sesión:", err);
            })
            .finally(() => setLoading(false));
 // Stop loading
            };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                {error && <div className='text-danger mb-3'><p>{error}</p></div>}
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='btn btn-success w-100 rounded-0 mb-2'
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                    <div className='mb-1'>
                        <input type="checkbox" name="tick" id="tick" className='me-2' />
                        <label htmlFor="tick">You agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
