import api from "../services/api";
import CharacterType from "../types/Character";

export const findCharacterByName = async (
  name: string
): Promise<CharacterType[]> => {
  try {
    const response = await api.get("/characters", {
      params: {
        name,
      },
    });
    return response.data.data.results;
  } catch (err) {
    console.log("Error:", err)
    throw err
  }
};
