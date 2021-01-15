import React, {useCallback} from 'react';
import './SaveButton.css';

function SaveButton({ isUserLoggedIn }) {
    const [isSaved, setSaved] = React.useState(false);

    const toggleSaveCard = useCallback(() => {
        setSaved(!isSaved);
    }, [isSaved]);

    return (
        <>
        {
            isUserLoggedIn ? 
            <button type="button" onClick={toggleSaveCard} 
                    className={isSaved ? 
                                "news-card__save-button news-card__save-button_loggedin news-card__save-button_blue" 
                                : "news-card__save-button news-card__save-button_loggedin"}></button> 
            :
            <button type="button" onClick={toggleSaveCard} className="news-card__save-button" disabled={true}></button>
        }
        </>
    );
}

export default SaveButton;