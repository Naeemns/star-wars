import React from "react";
import Character from "./character";

function SearchResults({ characterData, currentIndex }) {

    return (
        <div className="character-container" >
            {
                characterData?.map((character, index) => (
                    index <= 4 && <Character key={character.created} {...character} currentIndex={currentIndex === index} />
                ))
            }
        </div>
    )
}

export default SearchResults;