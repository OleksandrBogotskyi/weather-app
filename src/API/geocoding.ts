import axios from "axios";

const apiKey = import.meta.env.VITE_GEO_API_KEY;
const baseUrl = import.meta.env.VITE_GEO_API_URL;

export const getCitySuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 2) return []; 

  try {
    const { data } = await axios.get(baseUrl, {
      params: {
        q: query,
        key: apiKey,
        limit: 10,
        no_annotations: 1,
        language: "en",
      },
    });

    const formattedCities: string[] = data.results.map((result: any) => {
      const city = result.components.city || result.components.town || result.components.village;
      const country = result.components.country;
      return city ? `${city}, ${country}` : null;
    }).filter(Boolean);

    return Array.from(new Set(formattedCities));
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
