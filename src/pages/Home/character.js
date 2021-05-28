import React from "react";
import { useHistory } from "react-router-dom";
import "./searchResults.css"

function Character({ name, birth_year, gender }) {
    const history = useHistory();

    const handleCharacterClick = () => {
        history.push(`/person/${name}`)
    }

    return (
        <div onClick={handleCharacterClick} className="character-details">
            <div className="character-details__name-gender">
                <p>{name}</p>
                <p className="character-details-gender">{gender}</p>
            </div>
            <span>{birth_year}</span>
        </div>
    )
}

export default Character;