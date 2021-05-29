import React, { useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import logo from './star-wars-logo.png';
import loadingIndicator from './loading.gif';
import './index.css';
import SearchResults from './searchResults';

function HomePage() {
  const [query, setQuery] = useState("");
  let seachId = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [characterData, setCharacterData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const history = useHistory();
  // const [isDataAvailable, setIsDataAvailable] = useState(true);



  // let array = [
  //   {
  //     name: "Luke Skywalker",
  //     birth_year: "19BBY",
  //     gender: "male"
  //   },
  //   {
  //     name: "Anakin Skywalker",
  //     birth_year: "41.9BBY",
  //     gender: "male"
  //   },
  //   {
  //     name: "Bossk",
  //     birth_year: "53BBY",
  //     gender: "male"
  //   },
  //   {
  //     name: "Shmi Skywalker",
  //     birth_year: "72BBY",
  //     gender: "female"
  //   }
  // ]

  const inputStyle = characterData?.results?.length ? "search-input search-input--data" : "search-input search-input--no-data"


  const handleChange = (e) => {
    let { value } = e.target;
    setQuery(value);
    debouncer();
  }

  const debouncer = () => {
    if (seachId.current) {
      clearTimeout(seachId.current);
    }
    seachId.current = setTimeout(getData, 500);
  }


  // Making api call
  const getData = async () => {
    if (query.length <= 1) {
      setCharacterData([]);
      return;
    }
    setIsLoading(true);
    await axios.get(`https://swapi.dev/api/people/?search=${query}`)
      .then(res => {
        setCharacterData(res.data);
        // if (res.data.results.length === 0) setIsDataAvailable(false)
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }


  // Clear button functionality
  const handleClear = () => {
    setCharacterData([]);
    setQuery("");
    // setIsDataAvailable(true)
  }


  // Arrow key functionality
  const handleKeyDown = (e) => {
    // console.log(e.target)
    if (characterData.results) {
      if (e.key === "ArrowDown" && currentIndex + 1 < characterData.results.length) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === "ArrowUp" && currentIndex - 1 >= 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === "Enter" && currentIndex >= 0) {
        // console.log(currentIndex)
        const urlArray = characterData.results[currentIndex].url.split("/");
        const id = urlArray[urlArray.length - 2];
        history.push(`/person/${id}`)
      }
    }
  }



  return (
    <div onKeyDown={handleKeyDown}>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className="search">
        <input value={query} className={inputStyle} placeholder="Search by name" onChange={handleChange} />
        {
          isLoading ? <div className="search-action">
            {/*Loading indicator from https://loading.io/ */}
            <img src={loadingIndicator} alt="Loading..." />
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
      <SearchResults characterData={characterData} currentIndex={currentIndex} />
      {/* isDataAvailable={isDataAvailable} */}
    </div>
  );
}

export default HomePage;
