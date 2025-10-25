import React, { useState, useRef, useEffect } from 'react';
import './SupportChatbot.css';

const SupportChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! I'm the Orange Support Bot. How can I help you with your order or account?", sender: 'bot' }
    ]);
    const [userInput, setUserInput] = useState('');
    const chatBodyRef = useRef(null);

    // Auto-scroll to the bottom when new messages arrive
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    // Function to handle the simple 15-response AI logic
    const getBotResponse = (userText) => {
        const lowerText = userText.toLowerCase();
        let botResponse = "I apologize, I'm still learning and don't have an answer for that yet. Please call us at +234 704 176 3688 or check the FAQ section.";

        // --- All 15 response conditions are here (using the logic we developed earlier) ---
        if (lowerText.includes('hello') || lowerText.includes('hi')) {
            botResponse = "Hello! I'm here to quickly answer your most common questions about Orange. What can I help you find?";
        } else if (lowerText.includes('track') || lowerText.includes('status')) {
            botResponse = "To track your order, please go to the 'My Orders' section and tap on your active order for real-time GPS tracking!";
        } else if (lowerText.includes('payment') || lowerText.includes('accept')) {
            botResponse = "We accept Visa, MasterCard, Verve, and Cash on Delivery (CoD) in many areas. Payment issues? Please try another method.";
        } else if (lowerText.includes('cancel') || lowerText.includes('refund')) {
            botResponse = "You can cancel an order within 5 minutes of placing it. For complex refunds, please contact a human agent via our support phone number.";
        } else if (lowerText.includes('hours') || lowerText.includes('time') || lowerText.includes('open')) {
            botResponse = "Orange delivers between **8:00 AM and 10:00 PM** daily. Orders placed outside these times will be scheduled for the next morning.";
        } else if (lowerText.includes('app') || lowerText.includes('bug') || lowerText.includes('technical')) {
            botResponse = "If you're experiencing a technical issue or bug, please try clearing your app cache or reinstalling the app. If the problem persists, please email us with a screenshot for quick resolution!";
        } else if (lowerText.includes('number') || lowerText.includes('call') || lowerText.includes('support')) {
            botResponse = "Our main support line is **+234 704 176 3688**. You can also find our other contact methods in the 'Contact Us' section above.";
        } else if (lowerText.includes('promo') || lowerText.includes('voucher') || lowerText.includes('discount')) {
            botResponse = "To use a promo code, enter it on the checkout page before payment. Note that only one voucher can be used per order!";
        } else if (lowerText.includes('area') || lowerText.includes('deliver') || lowerText.includes('location')) {
            botResponse = "We currently deliver within all major districts in Lagos and Abuja. Enter your specific address at checkout to confirm coverage.";
        } else if (lowerText.includes('login') || lowerText.includes('password') || lowerText.includes('forgot')) {
            botResponse = "Click the 'Forgot Password' link on the login page. We'll send a secure link to your registered email or phone number to reset it.";
        } else if (lowerText.includes('change order') || lowerText.includes('add item')) {
            botResponse = "Unfortunately, you cannot modify an order once it is sent to the restaurant. You must cancel the order and place a new one.";
        } else if (lowerText.includes('wrong food') || lowerText.includes('bad quality')) {
            botResponse = "We are sorry! Please take a photo and send it immediately to our email: support@orange.com. We will arrange a full refund or a replacement.";
        } else if (lowerText.includes('fee') || lowerText.includes('charge') || lowerText.includes('cost')) {
            botResponse = "Delivery fees vary based on your distance from the restaurant. You can see the exact fee on the checkout screen before you confirm payment.";
        } else if (lowerText.includes('driver') || lowerText.includes('rider') || lowerText.includes('feedback')) {
            botResponse = "We take driver feedback seriously. Please use the 'Rate Your Order' feature after delivery, or email us directly with the rider's name/order number.";
        } else if (lowerText.includes('thank you') || lowerText.includes('bye') || lowerText.includes('thanks')) {
            botResponse = "You're very welcome! Have a great day and enjoy your food from Orange. Goodbye!";
        }

        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
        }, 500);
    };

    const sendMessage = () => {
        if (userInput.trim() === '') return;

        const newUserMessage = userInput.trim();
        setMessages(prevMessages => [...prevMessages, { text: newUserMessage, sender: 'user' }]);
        setUserInput('');
        
        // Get the bot's response
        getBotResponse(newUserMessage);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Icon */}
            <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
                {/* Font Awesome icon (assuming you have it installed) */}
                <i className="fas fa-comment-dots"></i> 
            </div>

            {/* Chat Window */}
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    Orange Support Bot 🤖
                    <span className="close-chat" onClick={() => setIsOpen(false)}>&times;</span>
                </div>
                <div className="chat-body" ref={chatBodyRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}-message`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input 
                        type="text" 
                        id="user-input" 
                        placeholder="Ask a question..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={sendMessage}><i className="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </>
    );
};

export default SupportChatbot;