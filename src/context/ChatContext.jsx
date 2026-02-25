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

  const saveCurrentConversation = () => {
    if (currentChat.length === 0) return null;

    const newSavedChat = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      messages: currentChat,
      rating: 0,
      subjectiveFeedback: ''
    };

    setSavedChats(prev => [newSavedChat, ...prev]);
    // Clear current chat after saving
    setCurrentChat([]);
    return newSavedChat.id;
  };

  const updateChatFeedback = (chatId, rating, feedbackText) => {
    setSavedChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, rating, subjectiveFeedback: feedbackText } : chat
    ));
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
    updateChatFeedback,
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
