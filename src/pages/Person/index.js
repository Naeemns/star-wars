import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IoChevronBackCircle } from 'react-icons/io5';
import { VscLoading } from 'react-icons/vsc';
import './index.css';

function Person() {
  const { id } = useParams();
  const [characterData, setCharacterData] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  // Making api call
  const getCharacterData = async () => {
    setIsLoading(true);
    await axios.get(`https://swapi.dev/api/people/${id}`)
      .then(res => setCharacterData(res.data))
      .catch(error => console.log(error))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      })
  }

  const handleBackButton = () => {
    history.push("/");
  }

  useEffect(() => {
    getCharacterData();
  }, [])


  const { name, birth_year, mass, height, gender, skin_color, hair_color, eye_color } = characterData;

  return isLoading ?
    <div className="person-page-loading">
      <VscLoading />
    </div>
    : (
      <div className="person">
        <h1>{name}</h1>
        <div className="person-details">
          <p>Birth year</p>
          <p>{birth_year}</p>
        </div>
        <div className="person-details">
          <p>Gender</p>
          <p>{gender}</p>
        </div>
        <div className="person-details">
          <p>Height</p>
          <p>{height}</p>
        </div>
        <div className="person-details">
          <p>Mass</p>
          <p>{mass}</p>
        </div>
        <div className="person-details">
          <p>Skin color</p>
          <p>{skin_color}</p>
        </div>
        <div className="person-details">
          <p>Hair color</p>
          <p>{hair_color}</p>
        </div>
        <div className="person-details">
          <p>Eye color</p>
          <p>{eye_color}</p>
        </div>
        <button onClick={handleBackButton}>
          <IoChevronBackCircle className="back-button" />
          <p>Back</p>
        </button>
      </div>
    );
}

export default Person;
