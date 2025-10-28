import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../contexts/storeContexts';


const LoaderIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <path d="M9 11l3 3L22 4"/>
    </svg>
);

const XCircleIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M15 9L9 15"/>
        <path d="M9 9l6 6"/>
    </svg>
);


// --- Main Component ---

const VerifyEmail = () => {
    const { url } = useContext(StoreContext); 
    const API_BASE_URL = `${url}/api/user/verify-email`;

    const { token } = useParams();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('Verifying your email address...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Verification link is missing a token.');
            return;
        }

        const verifyAccount = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log(data);
                
                if (response.ok && data.status === 'success') {
                    setStatus('success');
                    setMessage(data.message || 'Success! Your email has been verified. You can now log in.');
                } else {
                    setStatus('error');
                    if (data.message && data.message.includes('expired')) {
                         setMessage('Verification link has expired. Please request a new one below.');
                    } else {
                        setMessage(data.message || 'Verification failed. The link may be invalid or already used.');
                    }
                }
            } catch (error) {
                console.error("Verification API Error:", error);
                setStatus('error');
                setMessage('A network error occurred. Please try again or contact support.');
            }
        };

        verifyAccount();
    }, [token, API_BASE_URL]); 

    const renderIcon = () => {
        const baseClasses = "w-16 h-16";
        if (status === 'loading') {
            return <LoaderIcon className={`${baseClasses} text-orange-500 animate-spin`} />;
        } else if (status === 'success') {
            return <CheckCircleIcon className={`${baseClasses} text-green-500`} />;
        } else {
            return <XCircleIcon className={`${baseClasses} text-red-500`} />;
        }
    };

    const getTitleClasses = () => {
        let colorClass = 'text-orange-600'; 
        if (status === 'success') {
            colorClass = 'text-green-600';
        } else if (status === 'error') {
            colorClass = 'text-red-600';
        }
        return `text-3xl font-bold mb-3 ${colorClass}`;
    };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-inter">
            <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl text-center">
                <div className="mb-6 flex justify-center">
                    {renderIcon()}
                </div>
                
                <h1 className={getTitleClasses()}>
                    {status === 'loading' && 'Verifying...'}
                    {status === 'success' && 'Verification Complete'}
                    {status === 'error' && 'Verification Failed'}
                </h1>
                
                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                {status === 'success' && (
                    <button 
                        onClick={() => window.location.href = '/'} 
                        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-150 shadow-md"
                    >
                        Go to Login
                    </button>
                )}
                {status === 'error' && (
                    <button 
                        onClick={() => window.location.href = '/resend-verification'} 
                        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-150 shadow-md"
                    >
                        Resend Verification Email
                    </button>
                )}
                
            </div>
        </div>
    );
}

export default VerifyEmail;