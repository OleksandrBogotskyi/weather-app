import axios from 'axios';
import { WeatherData } from './types'; 

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: apiKey,
    units: 'metric',
  },
});

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default weatherApi;