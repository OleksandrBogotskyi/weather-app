import weatherApi from './axios';
import { WeatherData, WeatherListItem, Weather } from '../types/types';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: city },
    });

    const weatherListItem: WeatherListItem = {
      dt: response.data.dt,
      main: {
        temp: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
      },
      weather: response.data.weather.map((w: Weather) => ({
        id: w.id,
        main: w.main,
        description: w.description,
        icon: w.icon,
      })),
      clouds: {
        all: response.data.clouds.all,
      },
      wind: {
        speed: response.data.wind.speed,
        deg: response.data.wind.deg,
      },
      visibility: response.data.visibility,
    };

    const data: WeatherData = {
      cod: response.data.cod.toString(),
      message: 0,
      list: [weatherListItem],
      city: {
        id: response.data.id,
        name: response.data.name,
        coord: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        },
        country: response.data.sys.country,
        timezone: response.data.timezone,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
      },
    };

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
