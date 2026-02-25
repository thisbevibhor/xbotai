import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext';
import './Sidebar.css';

export default function Sidebar() {
    const { sidebarOpen, closeSidebar, clearCurrentChat } = useContext(ChatContext);

    const handleNewChat = () => {
        clearCurrentChat();
        closeSidebar();
    }

    return (
        <>
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
                onClick={closeSidebar}
            ></div>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    {/* We will add New Chat Icon here */}
                    <NavLink
                        to="/"
                        className="new-chat-btn"
                        onClick={handleNewChat}
                    >
                        New Chat
                        <span className="edit-icon">✎</span>
                    </NavLink>
                </div>
                <div className="sidebar-links">
                    <NavLink
                        to="/history"
                        className="history-link"
                        onClick={closeSidebar}
                    >
                        Past Conversations
                    </NavLink>
                </div>
            </div>
        </>
    );
}
