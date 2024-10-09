import React, { useState } from 'react';
import '../styles/forgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7125/api/Account/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message || 'Password reset link sent to your email.');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to send reset link. Please try again.');
                setMessage('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setMessage('');
            console.error('Forgot Password failed:', err);
        }
    };

    return (
        <div className="forgot-password">
            <div className="forgot-password-box">
                <header className="forgot-password-header">Forgot Password</header>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {message && <p className="success">{message}</p>}
                    <div className="input-submit">
                        <button className="submit-btn" type="submit">
                            Reset Password
                        </button>
                    </div>
                </form>
                <div className="back-to-login-link">
                    <p>
                        Remembered your password? <a href="/login">Back to Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
