import { useState, useEffect } from "react";
import axios from 'axios'
import md5 from 'md5'
import "./App.css";
import { Team } from "./assets/components/Team";

const App: React.FC = () => {

  const time = Number(new Date());
  const privateKey = import.meta.env.VITE_API_PRIVATE_KEY;
  const publicUrl = import.meta.env.VITE_API_PUBLIC_URL;
  const publicKey = import.meta.env .VITE_API_PUBLIC_KEY;
  const hash = md5(`${time}${privateKey}${publicKey}`);

  useEffect(() => {
    const apiUrl = `${publicUrl}ts=${time}&apikey=${publicKey}&hash=${hash}`;

    axios
      .get(apiUrl)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, [time, hash, publicKey]);

  return <div>{privateKey}</div>;
};

export default App;
