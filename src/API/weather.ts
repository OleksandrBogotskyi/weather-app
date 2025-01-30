import weatherApi from './axios';
import { WeatherData, WeatherListItem, Weather } from '../types/weather';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const { data } = await weatherApi.get('/weather', {
      params: { q: city },
    });

    const {
      dt,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      weather,
      clouds: { all: cloudiness },
      wind: { speed, deg },
      visibility,
      id,
      name,
      coord: { lat, lon },
      sys: { country, sunrise, sunset },
      timezone,
      cod,
    } = data;

    const weatherListItem: WeatherListItem = {
      dt,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      weather: weather.map((w: Weather) => ({
        id: w.id,
        main: w.main,
        description: w.description,
        icon: w.icon,
      })),
      clouds: { all: cloudiness },
      wind: { speed, deg },
      visibility,
    };

    const result: WeatherData = {
      cod: cod.toString(),
      message: 0,
      list: [weatherListItem],
      city: {
        id,
        name,
        coord: { lat, lon },
        country,
        timezone,
        sunrise,
        sunset,
      },
    };

    return result;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
