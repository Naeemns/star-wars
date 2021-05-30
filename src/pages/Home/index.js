import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { VscLoading } from 'react-icons/vsc';
import logo from './star-wars-logo.png';
import './index.css';
import SearchResults from './searchResults';

function HomePage() {
  const [query, setQuery] = useState("");
  let seachId = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [characterData, setCharacterData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [apiCallCompleted, setApiCallCompleted] = useState(false);
  const history = useHistory();

  const inputStyle = characterData?.length || apiCallCompleted || isLoading ? "search-input search-input--data" : "search-input search-input--no-data"


  const handleChange = (e) => {
    let { value } = e.target;
    setQuery(value);
  }

  const debouncer = () => {
    if (seachId.current) {
      clearTimeout(seachId.current);
    }
    seachId.current = setTimeout(getData, 500);
  }

  // Making api call
  const getData = async () => {
    setIsLoading(true);
    await axios.get(`https://swapi.dev/api/people/?search=${query}`)
      .then(res => {
        setCharacterData(res.data.results.filter((_, index) => index < 5));
      })
      .catch(error => console.log(error))
      .finally(() => {
        setApiCallCompleted(true);
        setIsLoading(false)
      });
  }

  // Clear button functionality
  const handleClear = () => {
    setCharacterData([]);
    setQuery("");
    setCurrentIndex(-1);
    setApiCallCompleted(false);
  }

  // Arrow key functionality
  // On clicking arrow down key the foucs goes to the next element
  // On clicking arrow up key the foucs goes to the previous element
  // On clicking enter key, page will be redirected to person page
  const handleKeyDown = (e) => {
    if (characterData) {
      if (e.key === "ArrowDown" && currentIndex + 1 < characterData.length) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === "ArrowUp" && currentIndex - 1 >= 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === "Enter" && currentIndex >= 0) {
        const urlArray = characterData[currentIndex].url.split("/");
        const id = urlArray[urlArray.length - 2];
        history.push(`/person/${id}`)
      }
    }
  }


  useEffect(() => {
    if (query.length) {
      debouncer();
    }

    return () => {
      clearTimeout(seachId);
    }
  }, [query])


  return (
    <div onKeyDown={handleKeyDown} className="container">
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className="search">
        <input value={query} className={inputStyle} placeholder="Search by name" onChange={handleChange} />
        {
          isLoading ?
            <div className="search-action">
              <VscLoading className="search-action__loading" />
            </div>
            : <div className="search-action">
              {
                query &&
                <div className="search-action-clear" onClick={handleClear}>
                  <MdClear />
                </div>
              }
              <div className="search-action__icon" onClick={getData}>
                <BiSearch />
              </div>
            </div>
        }
      </div>
      {
        isLoading ?
          <div className="character-container">
            <h3>Loading...</h3>
          </div>
          : apiCallCompleted && characterData.length === 0 ?
            <div className="character-container">
              <h3>No results found</h3>
            </div>
            : <SearchResults characterData={characterData} currentIndex={currentIndex} />
      }
    </div>
  );
}

export default HomePage;
