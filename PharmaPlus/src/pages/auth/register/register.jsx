import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './../../../services/api';
import './register.css';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post('/users/register', formData);
            
            if (response.status === 201 || response.status === 200) {
                alert('Registration Successful! Please login.');
                navigate('/');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="neon-card" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input 
                    className="neon-input" 
                    type="text" 
                    placeholder="Username" 
                    required 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <input 
                    className="neon-input" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                <input 
                    className="neon-input" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button className="neon-button" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <p className="toggle-text">
                    Already have an account? <Link to="/" style={{ color: '#10b981' }}>Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;