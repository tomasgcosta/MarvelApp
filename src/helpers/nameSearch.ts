import api from "../services/api";
import CharacterType from "../types/Character";

interface MarvelResponse {
  data: {
    results: CharacterType[];
  };
}

export const findCharacterByName = async (
  nameStartsWith: string,
): Promise<CharacterType[]> => {
  try {
    const response = await api.get<MarvelResponse>("/characters", {
      params: {
        nameStartsWith,
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error("Error searching for characters:", error);
    throw new Error("Failed to retrieve character data.");
  }
};
