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
                <div className="absolute inset-0 b hover:bg-red-600 hover:bg-opacity-40 transition-opacity duration-150" />
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
            <h3 className="flex  justify-start text-[3rem] text-white">
              <span className="">{ele.name}</span>
            </h3>
            <div className="flex flex-row " key={ele.id}>
              <img
                className="min-h-[400px] max-h-[400px] max-w-[400px] min-w-[400px] rounded-l-md"
                src={`${ele.thumbnail.path}.${ele.thumbnail.extension}`}
                alt={`Picture of ${ele.name}`}
              />
              <div className="flex flex-col bg-gray-300 rounded-r-md">
                <span className="items-center px-4 py-4 text-[1.2rem]">
                  {ele.description}
                </span>
              </div>
            </div>

            <h1 className=" flex py-4 justify-start items-center text-white text-[3rem]">
              Comics
            </h1>
            <div className="grid grid-cols-5 items-center px-[7rem]">
              {foundComic.map((comic, idx) => (
                <div className=" py-1 px-1">
                  <div className="" key={idx}>
                    <img
                      className="max-w-[14rem] max-h-[20rem] min-w-[14rem] min-h-[20rem] rounded-sm shadow-md"
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={`Cover of ${comic.title}`}
                    />
                    <div className="">
                      <span className="text-white font-medium">
                        {comic.title}
                      </span>

                      <div className="">
                        {comic.creators.items
                          .slice(0, 2)
                          .map((creator, idx) => (
                            <span
                              key={idx}
                              className="text-[0.8rem] text-white font-thin"
                            >
                              {idx > 0 && ", "}
                              {creator.name.length > 1 ? creator.name : ""}
                              
                            </span>
                          ))}
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
