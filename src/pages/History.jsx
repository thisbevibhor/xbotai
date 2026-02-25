import React, { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from '../components/Message';
import './History.css';

export default function History() {
    const { savedChats, toggleSidebar } = useContext(ChatContext);
    const [filterRating, setFilterRating] = useState('All');

    const handleFilterChange = (e) => {
        setFilterRating(e.target.value);
    };

    const filteredChats = filterRating === 'All'
        ? savedChats
        : savedChats.filter(chat => chat.rating === parseInt(filterRating));

    return (
        <div className="history-page">
            <header className="history-header">
                <button className="mobile-menu-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1 className="header-title">Conversation History</h1>
            </header>

            <div className="history-content">
                <div className="filter-dropdown">
                    <div className="filter-section">
                        <h2>Past Conversations</h2>
                        <div>
                            <label htmlFor="rating-filter">Filter by Rating: </label>
                            <select id="rating-filter" value={filterRating} onChange={handleFilterChange}>
                                <option value="All">All Ratings</option>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>
                    </div>

                    {filteredChats.length === 0 ? (
                        <p className="no-chats-msg">No conversations match the selected filter.</p>
                    ) : (
                        <div className="saved-chats-list">
                            {filteredChats.map((chat) => (
                                <div key={chat.id} className="saved-chat-card">
                                    <div className="chat-meta">
                                        <div className="chat-date">{new Date(chat.date).toLocaleString()}</div>
                                        <div className="chat-rating">
                                            Rating: {'★'.repeat(chat.rating)}{'☆'.repeat(5 - chat.rating)}
                                        </div>
                                    </div>
                                    {chat.subjectiveFeedback && (
                                        <div className="chat-feedback-text">
                                            <strong>Feedback:</strong> {chat.subjectiveFeedback}
                                        </div>
                                    )}
                                    <hr className="divider" />
                                    <div className="chat-messages">
                                        {chat.messages.map(msg => (
                                            // We render a simpler view, or reuse Message component. 
                                            // To show feedback (thumbs up/down/null) stored on AI messages
                                            <Message key={msg.id} message={msg} onFeedback={() => { }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
