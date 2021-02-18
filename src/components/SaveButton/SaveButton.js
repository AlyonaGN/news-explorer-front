import React, {useCallback} from 'react';
import './SaveButton.css';

function SaveButton({ isUserLoggedIn, onSave }) {
    const [isSaved, setSaved] = React.useState(false);

    const toggleSaveCard = useCallback(() => {
        setSaved(!isSaved);
    }, [isSaved]);

    const handleSaveClick = useCallback((e) => {
        onSave(e);
        toggleSaveCard();
    }, [onSave, toggleSaveCard]);

    return (
        <>
        {
            isUserLoggedIn ? 
            <button type="button" onClick={handleSaveClick} 
                    className={isSaved ? 
                                "news-card__save-button news-card__save-button_loggedin news-card__save-button_blue" 
                                : "news-card__save-button news-card__save-button_loggedin"}></button> 
            :
            <button type="button" className="news-card__save-button" disabled={true}></button>
        }
        </>
    );
}

export default SaveButton;