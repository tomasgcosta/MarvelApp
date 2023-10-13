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
    /* setFoundChar(result); */

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
    setFoundChar([suggestedChar]);
    setSuggestion([]);
  };

  return (
    <div className="flex flex-col relative justify-center items-center">
      <div className="content-center">
        <input
          className="min-w-[32rem] mt-[5rem] rounded-sm px-2 py-2 placeholder:translate- relative"
          onChange={handleChange}
          placeholder="Choose a Marvel character name"
        />
        <div className="bg-slate-400 mt-[0.05rem] rounded-b-sm absolute shadow-md shadow-slate-700 min-w-[30rem] ">
          {suggestion?.map((suggestedChar: CharacterType) => (
            <div
              className="flex flex-row py-1 min-w-full px-1 mt-1rounded-sm cursor-pointer hover:bg-red-600 duration-150 ease-in-out"
              key={suggestedChar.id}
              onClick={() => handleSuggestionClick(suggestedChar)}
            >
              <div className="relative shadow-sm">
                <img
                  className="min-h-[80px] max-h-[80px] max-w-[80px] min-w-[80px] rounded-sm"
                  src={`${suggestedChar.thumbnail.path}.${suggestedChar.thumbnail.extension}`}
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t hover:bg-gradient-to-t hover:from-red-600 hover:from-1% transition-opacity duration-150"/>
              </div>
              <span className="flex items-center justify-start min-w-[25rem] py-1 px-1 ml-2 rounded-sm font-medium">
                {suggestedChar.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {foundComic.length > 0 &&
        foundChar.map((ele) => (
          <div className="px-4 py-4">
          <div className="flex flex-row shadow-md shadow-slate-400" key={ele.id}>
            <img
              className="min-h-[400px] max-h-[400px] max-w-[400px] min-w-[400px] rounded-sm"
              src={`${ele.thumbnail.path}.${ele.thumbnail.extension}`}
              alt={`Picture of ${ele.name}`}
            />
            <div className="flex flex-col bg-gray-300 rounded-sm ">
            <h3 className="flex items-center justify-center text-[5rem] border-b-2 border-red-600">{ele.name}</h3>
            <span className="items-center px-4 py-4 text-[1.2rem]">{ele.description}</span>
            </div>
            </div>
            <div className="flex flex-col">
              <h1 className=" flex py-1 px-1 justify-center items-center text-[4rem]">Comics</h1>
              {foundComic.map((comic, idx) => (
                <div className=" py-1 px-1 bg-gray-300 rounded-sm">
                  <div className="flex flex-row bg-gray-400 rounded-sm items-center" key={idx}>
                    <img
                      className="max-w-[11rem] max-h-[16rem] min-w-[11rem] min-h-[16rem] rounded-sm"
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={`Cover of ${comic.title}`}
                    />
                    <div className="flex flex-col justify-center items-center content-center place-content-center">
                      
                    <span className="text-[1.5rem] border-b-2 border-red-600">{comic.title}</span>
                    <span className="items-center px-4 py-4 text-[1rem]">{comic.description}</span>
                    <div className="flex flex-row gap-2 mt-4 px-2">
                    
                      {comic.creators.items.map(
                        (creator: string) => <span className="text-[1rem]">{creator.name}</span>
                      )}
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          
          </div>
        ))}
    </div>
    
  );
};
