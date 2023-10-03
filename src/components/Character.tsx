import React, { useState, useEffect, ChangeEvent } from "react";
import CharacterType from "../types/Character";
import { findCharacterByName } from "../helpers/nameSearch";
import { findComicsByUri } from "../helpers/comicsSearch";
import ComicType from "../types/Comic";

export const Character: React.FC = () => {
  const [suggestion, setSuggestion] = useState([]);
  const [foundChar, setFoundChar] = useState<CharacterType[]>([]);
  const [foundComic, setFoundComic] = useState<ComicType[]>([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await findCharacterByName(e.target.value);
    setFoundChar(result);

    if (e.target.value) {
      try {
        const suggested = await findCharacterByName(e.target.value);
        setSuggestion(suggested);
      } catch (err) {
        console.log("Error", err);
      }
    }

    const comicsPromises = result[0].comics.items.map(async (item) => {
      try {
        const comicsResult = await findComicsByUri(item.resourceURI);
        return comicsResult;
      } catch (error) {
        console.error("Error fetching comics:", error);
        return [];
      }
    });

    // Waiting for all the promises is important
    const comicsResults = await Promise.all(comicsPromises);

    // Transforms the multiple arrays into one single array for faster access
    const allComics = comicsResults.flat();

    setFoundComic(allComics);
  };

  const handleSuggestionClick = (suggestedChar: CharacterType) => {
    // Clear suggestions and set the selected character
    setSuggestion([]);
    setFoundChar([suggestedChar]);
  };

  return (
    <div className="flex relative justify-center">
      <input className='min-w-[45%] mt-[5rem] rounded-sm px-2 py-2' onChange={handleChange} placeholder="Choose a Marvel character name" />
      <div>
        {suggestion.map((suggestedChar: CharacterType) => (
          <div key={suggestedChar.id} onClick={() => handleSuggestionClick(suggestedChar)}>
            {suggestedChar.name}
            <img className='h-[80px] rounded-md' src={`${suggestedChar.thumbnail.path}.${suggestedChar.thumbnail.extension}`} alt="" />
          </div>
        ))}
      </div>
      {foundComic.length > 0 &&
        foundChar.map((ele) => (
          <div key={ele.id}>
            <img className=""
              src={`${ele.thumbnail.path}.${ele.thumbnail.extension}`}
              alt={`Picture of ${ele.name}`}
            />
            <h3>{ele.name}</h3>
            <span>{ele.description}</span>
            <div>
              <h1>Comics</h1>
              {foundComic.map((comic, idx) => (
                <div key={idx}>
                  <span>{comic.title}</span>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={`Picture of ${comic.title}`}
                  />
                  <span>{comic.description}</span>
                  <div>
                    {comic.creators.items.map((creator: string) => creator.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
