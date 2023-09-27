import React, { useState, useEffect, ChangeEvent } from "react";
import api from "../services/api";
import CharacterType from "../types/Character";
import { findCharacterByName } from "../helpers/nameSearch";
import { findComics, findComicsByUri } from "../helpers/comicsSearch";
import ComicType from "../types/Comic";

export const Character: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [suggestion, setSuggestion] = useState("");
  const [foundChar, setFoundChar] = useState<CharacterType[]>([]);
  const [comic, setComic] = useState<ComicType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/characters");
        setCharacters(response.data.data.results);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await findCharacterByName(e.target.value);
    setFoundChar(result);

    const comicsPromises = result[0].comics.items.map(async (item) => {
      try {
        const comicsResult = await findComicsByUri(item.resourceURI);
        return comicsResult;
      } catch (error) {
        console.error('Error fetching comics:', error);
        return [];
      }
    });
  
    // Waiting for all the promises is important
    const comicsResults = await Promise.all(comicsPromises);
  
   // Transforms the multiple arrays into one single array for faster access
    const allComics = comicsResults.reduce((prev, current) => [...prev, ...current], []);

    setComic(allComics);

  };

  return (
    <div>
      <input onChange={handleChange} placeholder="Type a hero/villain name" />
      {foundChar?.map((ele) => (
        <div key={ele.id}>
          {/* <>{console.log(ele.id)}</> */}
          <img
            src={`${ele.thumbnail.path}.${ele.thumbnail.extension}`}
            alt={`Picture of ${ele.name}`}
          />
          <h3>{ele.name}</h3>
          <span>{ele.description}</span>

          <div>
            <h1>Comics</h1>
            <div>
              {comic.map((comic, idx) => (
                <div key={idx}>
                  <span>{comic.title}</span>
                  <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
                  <span>{comic.description}</span>
                  <div>{comic.creators.items.map((x) => x.name)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
