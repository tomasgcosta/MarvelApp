import React, { ChangeEvent, useEffect, useState } from "react";
import api from "../services/api";
import CreatorType from "../types/Creator";
import { filterOptions } from "../helpers/helper";

export const Creator: React.FC = () => {
  const [creators, setCreators] = useState<CreatorType[]>([]);
  const [suggestion, setSuggestion] = useState<string>("");
  const [filteredCreators, setFilteredCreators] = useState<CreatorType[]>([]);

  useEffect(() => {
    api
      .get("/creators")
      .then((response) => setCreators(response.data.data.results))
      .catch((err) => console.log("Error:", err));
  }, []);

  useEffect(() => {
    const filtered = filterOptions(creators, suggestion);
    if (filtered) {
      setFilteredCreators(filtered);
    }
  }, [creators, suggestion]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSuggestion(e.target.value);
  };

  return (
    <div>
      <input onChange={handleChange} placeholder="Type a creator name" />

      {filteredCreators?.map((creator, index) => (
        <div key={index}>{creator.fullName}</div>
      ))}
    </div>
  );
};
