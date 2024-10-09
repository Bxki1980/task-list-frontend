import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, userName, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('https://localhost:7071/api/Login/CreateNewAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, userName, password }),
            });

            if (response.ok) {
                setMessage('Registration successful. Please log in.');
                setError('');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed. Please try again.');
                setMessage('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setMessage('');
            console.error('Sign Up failed:', err);
        }
    };

    return (
        <div className="signup">
            <div className="signup-box">
                <header className="signup-header">Sign Up</header>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="input-field"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="input-field"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="userName">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            name="userName"
                            id="userName"
                            placeholder="Username"
                            value={formData.userName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            name="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="input-field"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {message && <p className="success">{message}</p>}
                    <div className="input-submit">
                        <button className="submit-btn" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="login-link">
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
