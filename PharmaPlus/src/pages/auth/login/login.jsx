import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './../../../services/api'
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post('/users/login', { email, password });
            
            if (response.status === 200) {
                alert('Login Successful!');
                navigate('/home');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="neon-card" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                
                <input 
                    className="neon-input" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                
                <input 
                    className="neon-input" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                
                <button 
                    className="neon-button" 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Authenticating...' : 'Login'}
                </button>

                <p className="toggle-text">
                    Need an account? <Link to="/register" style={{ color: '#10b981' }}>Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;