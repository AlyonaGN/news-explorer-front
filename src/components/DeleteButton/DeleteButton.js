import React, { useCallback } from 'react';
import './DeleteButton.css';

function DeleteButton({onClick}) {
    const handleUnsave = useCallback((e) => {
        e.preventDefault();
        onClick(e);
    }, [onClick]);

    return (
        <button type="button" className="news-card__delete-button" onClick={handleUnsave}></button>
    );
}

export default DeleteButton;