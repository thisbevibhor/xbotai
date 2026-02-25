import React from 'react';
import './SuggestionCards.css';

const SUGGESTIONS = [
    { question: "Hi, what is the weather", subtitle: "Get immediate AI generated response" },
    { question: "Hi, what is my location", subtitle: "Get immediate AI generated response" },
    { question: "Hi, what is the temperature", subtitle: "Get immediate AI generated response" },
    { question: "Hi, how are you", subtitle: "Get immediate AI generated response" }
];

export default function SuggestionCards({ onSuggestionClick }) {
    return (
        <div className="suggestions-container">
            <div className="cards-grid">
                {SUGGESTIONS.map((item, index) => (
                    <div
                        key={index}
                        className="suggestion-card"
                        onClick={() => onSuggestionClick(item.question)}
                    >
                        <h3 className="card-title">{item.question}</h3>
                        <p className="card-subtitle">{item.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
