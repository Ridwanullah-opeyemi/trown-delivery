import React, { useState } from 'react';
import {useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPasswordPage.css';
import { StoreContext } from '../../contexts/storeContexts';

 
const ResetPasswordPage = () => {
    const { token } = useParams(); 
    const navigate = useNavigate();
    const { url } = useContext(StoreContext)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const API_BASE_URL = `${url}/api/user/passwordreset`;
    const API_URL = `${API_BASE_URL}/${token}`;


    const isPasswordStrong = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(pwd);
    };

    if (!token) {
        return (
            <div className="reset-container">
                <div className="reset-card">
                    <h2 className="reset-title">Error</h2>
                    <p className="reset-message message-error">
                        Missing password reset token. Please use the complete link from your email.
                    </p>
                    <button className="back-button" onClick={() => navigate('/forgot-password')}>
                        Request New Link
                    </button>
                </div>
            </div>
        );
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }
        if (!isPasswordStrong(password)) {
            setError('Password must be at least 8 characters and include uppercase, lowercase, and a number.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_URL, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newpassword: password 
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(`🎉 ${data.message}! You will be redirected to the login page.`);
                setTimeout(() => navigate('/'), 3000); 
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(`Error: ${data.message}`);
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
                <h2 className="reset-title">Set New Password</h2>

                {success && (
                    <div className="reset-message message-success">
                        {success}
                    </div>
                )}

                {error && !success && (
                    <p className="reset-message message-error">
                        {error}
                    </p>
                )}

                {!success && (
                    <form onSubmit={handleSubmit} className="reset-form">
                        

                        <label className="reset-label">New Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                disabled={loading}
                                className="reset-input"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="toggle-button"
                            >
                                {showPassword ? '👁️ Hide' : '🔒 Show'}
                            </button>
                        </div>

                        {password.length > 0 && (
                            <p className={`strength-indicator ${isPasswordStrong(password) ? 'strength-strong' : 'strength-weak'}`}>
                                {isPasswordStrong(password) ? '✅ Strong password' : '⚠️ Must be 8+ chars, with U/L case & number.'}
                            </p>
                        )}

                        <label className="reset-label">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            disabled={loading}
                            className="reset-input"
                            style={{ marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
                        />
                        {confirmPassword.length > 0 && password !== confirmPassword && (
                            <p className="match-error">❌ Passwords do not match.</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !isPasswordStrong(password) || password !== confirmPassword} 
                            className="reset-button"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;