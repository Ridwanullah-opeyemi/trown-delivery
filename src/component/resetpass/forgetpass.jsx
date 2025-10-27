import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css';



const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const API_URL = 'http://localhost:4002/api/user/forgotpassword';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!email) {
            setError('Please enter your email address.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                setEmail('');
            } else {
                setError(`An error occurred: ${data.message || 'Please try again.'}`);
            }

        } catch (apiError) {
            console.error('API Error:', apiError);
            setError('Could not connect to the server. Please check your network.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <h2 className="reset-title">Forgot Your Password?</h2>
                
                {success ? (
                    <div className="reset-message message-success">
                        <p>{success}</p>
                        <button className="login-button" onClick={() => navigate('/')}>
                            Back to Login
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="forgot-text">
                            Enter your registered email address below. We will send you a link to reset your password.
                        </p>

                        {error && (
                            <p className="reset-message message-error">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="reset-form">

                            <label className="reset-label">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@domain.com"
                                required
                                disabled={loading}
                                className="reset-input forgot-email-input"
                            />

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="reset-button"
                            >
                                {loading ? 'Sending Link...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;