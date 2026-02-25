import React from 'react';
import './SuggestionCards.css';
import sampleData from '../sampleData.json';

export default function SuggestionCards({ onSuggestionClick }) {
    return (
        <div className="suggestions-container">
            <div className="cards-grid">
                {sampleData.map((item, index) => (
                    <div
                        key={index}
                        className="suggestion-card"
                        onClick={() => onSuggestionClick(item.question)}
                    >
                        <h3 className="card-title">{item.question}</h3>
                        <p className="card-subtitle">{item.response}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
