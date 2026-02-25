import React, { useState } from 'react';
import './Message.css';
import aiAvatar from '../assets/ai.png';
import userAvatar from '../assets/user.png';

export default function Message({ message, onFeedback }) {
    const { sender, text, time, feedback } = message;
    const isAI = sender === 'Soul AI';

    // Using imported avatars as requested by user.
    const avatarUrl = isAI ? aiAvatar : userAvatar;

    return (
        <div className={`message-container ${isAI ? 'ai' : 'user'}`}>
            <img src={avatarUrl} alt={`${sender} avatar`} className="avatar" />
            <div className="message-content">
                <div className="message-header">
                    {isAI ? <span className="sender-name">{sender}</span> : <strong className="sender-name">{sender}</strong>}
                </div>
                {isAI ? <p className="message-text">{text}</p> : <div className="message-text">{text}</div>}

                <div className="message-footer">
                    <span className="time">{time}</span>
                    {isAI && (
                        <div className="feedback-actions">
                            <button
                                className={`feedback-btn ${feedback === 'up' ? 'active' : ''}`}
                                onClick={() => onFeedback(message.id, 'up')}
                                title="Thumbs Up"
                            >
                                👍
                            </button>
                            <button
                                className={`feedback-btn ${feedback === 'down' ? 'active' : ''}`}
                                onClick={() => onFeedback(message.id, 'down')}
                                title="Thumbs Down"
                            >
                                👎
                            </button>
                        </div>
                    )}
                </div>
                {/* On /history screen feedback will be shown if exists, we handle it in History component or pass prop */}
            </div>
        </div>
    );
}
