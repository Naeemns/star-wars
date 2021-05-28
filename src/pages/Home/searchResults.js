import React from "react";
import Character from "./character";

function SearchResults({ characterData }) {


    return (
        <div className="character-container">
            {
                characterData?.results?.map(character => (
                    <Character key={character.created} {...character} />
                ))
            }
        </div>
    )
}

export default SearchResults;