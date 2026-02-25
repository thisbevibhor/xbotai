import React, { useState } from 'react';
import './FeedbackModal.css';

export default function FeedbackModal({ isOpen, onClose, onSave }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(rating, feedbackText);
        setRating(0);
        setFeedbackText('');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Provide Feedback</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="feedback-form">

                    <div className="rating-container">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <div className="textarea-container">
                        <textarea
                            className="feedback-textarea"
                            placeholder="Provide subjective feedback..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-save-modal">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
