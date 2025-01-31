import weatherApi from './axios';
import { WeatherData} from '../types/weather';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const { data } = await weatherApi.get('/forecast', {  
      params: { q: city, cnt: 8, units: "metric" },
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

