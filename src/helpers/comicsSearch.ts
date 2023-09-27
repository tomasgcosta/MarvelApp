import api from "../services/api";
/* import CharacterType from "../types/Character"; */
import ComicType from "../types/Comic";

/* export const findComics = async (
  characterId: string
): Promise<CharacterType[]> => {
  try {
    const response = await api.get(`/characters/${characterId}/comics`);
    return response.data.data.results;
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
}; */

export const findComicsByUri = async (resourceURI: string): Promise<ComicType[]> => {
    const regex = /\/(\d+)$/; // Expressão regular para extrair o número no final da URL

    const match = resourceURI.match(regex);
    
    let comicNumber: number | null = null;
    
    if (match && match[1]) {
      comicNumber = parseInt(match[1], 10);
    }
    
    /* console.log("Comic number:", comicNumber); */
try {
    const response = await api.get(`/comics/${comicNumber}`)
    return response.data.data.results
}catch (err) {
    console.log("Error:", err);
    throw err;
  }
}
