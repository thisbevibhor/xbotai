import React, { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Current active chat session messages
  const [currentChat, setCurrentChat] = useState([]);
  
  // All saved conversations
  const [savedChats, setSavedChats] = useState(() => {
    const saved = localStorage.getItem('xbotai_chats');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Mobile sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Save updated history to localStorage
  useEffect(() => {
    localStorage.setItem('xbotai_chats', JSON.stringify(savedChats));
  }, [savedChats]);

  const addMessageToCurrent = (message) => {
    setCurrentChat(prev => [...prev, message]);
  };

  const updateMessageFeedback = (messageId, feedbackType) => {
    setCurrentChat(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
    ));
  };
  
  const saveCurrentConversation = (rating, feedbackText) => {
    if (currentChat.length === 0) return;
    
    const newSavedChat = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      messages: currentChat,
      rating: rating,
      subjectiveFeedback: feedbackText
    };
    
    setSavedChats(prev => [newSavedChat, ...prev]);
    // Clear current chat after saving
    setCurrentChat([]);
  };

  const clearCurrentChat = () => {
    setCurrentChat([]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const value = {
    currentChat,
    savedChats,
    sidebarOpen,
    addMessageToCurrent,
    updateMessageFeedback,
    saveCurrentConversation,
    clearCurrentChat,
    toggleSidebar,
    closeSidebar
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
