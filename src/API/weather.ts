import weatherApi from './axios';
import { WeatherData } from '../types/weather';
import { API_URL } from '../utils/constants';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const { data } = await weatherApi.get(API_URL.FORECAST, {  
      params: { q: city, cnt: 40, units: "metric" },
    });

    const result: WeatherData = {
      cod: data.cod.toString(),
      message: 0,
      list: data.list, 
      city: data.city,
    };

    return result;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

