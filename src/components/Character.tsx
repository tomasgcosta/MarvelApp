import React, { useState, useEffect } from "react";
import api from "../services/api";
import CharacterType from "../types/Character";

export const Character: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    api
      .get("/characters")
      .then((response) => {
        setCharacters(response.data.data.results);
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  return (
    <div>
      {characters?.map((ele, key) => (
        <div key={key}>
         {/*  <img
            src={`${ele.thumbnail.path}.${ele.thumbnail.extension}`}
            alt={`Picture of ${ele.name}`}
          /> */}
          <h3>{ele.name}</h3>
          <span>{ele.description}</span>
        </div>
      ))}
    </div>
  );
};
