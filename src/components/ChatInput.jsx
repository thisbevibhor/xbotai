import React, { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSendMessage, onSave }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSendMessage(text);
        setText('');
    };

    return (
        <div className="chat-input-wrapper">
            <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Message Bot AI..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="btn btn-ask">Ask</button>
                <button type="button" className="btn btn-save" onClick={onSave}>Save</button>
            </form>
        </div>
    );
}
