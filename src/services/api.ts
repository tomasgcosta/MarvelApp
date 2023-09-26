import md5 from "md5";
import axios from "axios";

const time = Number(new Date());

const privateKey = import.meta.env.VITE_API_PRIVATE_KEY;
const publicUrl = import.meta.env.VITE_API_PUBLIC_URL;
const publicKey = import.meta.env.VITE_API_PUBLIC_KEY;

const hash = md5(`${time}${privateKey}${publicKey}`);

const api = axios.create({
  baseURL: publicUrl,
  params: {
    ts: time,
    apikey: publicKey,
    hash,
    limit: 100,
   
  },
});

console.log(publicUrl)

export default api;
