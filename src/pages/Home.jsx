import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from '../components/Message';
import ChatInput from '../components/ChatInput';
import SuggestionCards from '../components/SuggestionCards';
import FeedbackModal from '../components/FeedbackModal';
import sampleData from '../sampleData.json';
import aiLogo from '../assets/ai.png';
import './Home.css';

export default function Home() {
    const {
        currentChat,
        addMessageToCurrent,
        updateMessageFeedback,
        saveCurrentConversation,
        toggleSidebar
    } = useContext(ChatContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentChat]);

    const handleSendMessage = (text) => {
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add User Message
        const userMsg = {
            id: Date.now().toString(),
            sender: 'You',
            text: text,
            time: timeString
        };
        addMessageToCurrent(userMsg);

        // Simulate AI response delay
        setTimeout(() => {
            const match = sampleData.find(item => item.question.toLowerCase() === text.toLowerCase().trim());
            const responseText = match ? match.response : "Sorry, Did not understand your query!";

            const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                sender: 'Soul AI',
                text: responseText,
                time: aiTime,
                feedback: null // 'up' or 'down'
            };
            addMessageToCurrent(aiMsg);
        }, 500); // 500ms delay
    };

    const handleFeedback = (messageId, type) => {
        updateMessageFeedback(messageId, type);
    };

    const handleSaveClick = () => {
        if (currentChat.length > 0) {
            setIsModalOpen(true);
        } else {
            alert("No conversation to save. Chat first!");
        }
    };

    const handleModalSave = (rating, feedbackText) => {
        saveCurrentConversation(rating, feedbackText);
        setIsModalOpen(false);
    };

    return (
        <div className="home-container">

            {/* Header matching stub requirements + mobile menu icon */}
            <header className="home-header">
                <button className="mobile-menu-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1 className="header-title">Bot AI</h1>
            </header>

            {/* Main content scrollable area */}
            <div className="chat-scroll-area" ref={scrollRef}>

                {currentChat.length === 0 ? (
                    <div className="welcome-screen">
                        <h2 className="welcome-title">How Can I Help You Today?</h2>
                        {/* Logo image from figma */}
                        <img src={aiLogo} alt="AI Logo" className="logo-placeholder" />

                        <div className="suggestions-wrapper">
                            <SuggestionCards onSuggestionClick={handleSendMessage} />
                        </div>
                    </div>
                ) : (
                    <div className="messages-list">
                        {currentChat.map(msg => (
                            <Message
                                key={msg.id}
                                message={msg}
                                onFeedback={handleFeedback}
                            />
                        ))}
                    </div>
                )}

            </div>

            {/* Input fixed at bottom */}
            <div className="input-container">
                <ChatInput onSendMessage={handleSendMessage} onSave={handleSaveClick} />
            </div>

            <FeedbackModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleModalSave}
            />

        </div>
    );
}
