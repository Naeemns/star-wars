import React, { useEffect, useRef } from "react";
import Character from "./character";

function SearchResults({ characterData, isDataAvailable, currentIndex }) {
    const containerScrollRef = useRef();
    useEffect(() => {
        if (currentIndex > 2) {
            containerScrollRef.current.scrollTop += 56.6
        } else if (currentIndex) {

        }
    }, [currentIndex])

    return (
        <div className="character-container" ref={containerScrollRef}>
            {
                // isDataAvailable ?
                characterData?.results?.map((character, index) => {
                    // console.log(index)
                    return (
                        <Character key={character.created} {...character} currentIndex={currentIndex === index} />
                    )
                })
                // : <p className="character-details">No search results</p>
            }
        </div>
    )
}

export default SearchResults;