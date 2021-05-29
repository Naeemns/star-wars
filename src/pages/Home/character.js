import React from "react";
import { useHistory } from "react-router-dom";
import "./searchResults.css"

function Character({ name, birth_year, gender, url, currentIndex }) {
    const history = useHistory();

    const handleCharacterClick = () => {
        const urlArray = url.split("/");
        const id = urlArray[urlArray.length - 2];
        history.push(`/person/${id}`)
    }

    const characterDetailsFocusStyle = currentIndex ? "character-details active" : "character-details"

    return (
        <div onClick={handleCharacterClick} className={characterDetailsFocusStyle}>
            <div className="character-details__name-gender">
                <p>{name}</p>
                <p className="character-details-gender">{gender}</p>
            </div>
            <span>{birth_year}</span>
        </div>
    )
}

export default Character;