export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface CityCoord {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  name: string;
  coord: CityCoord;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherListItem {
  dt: number;
  main: WeatherMain;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
}

export interface WeatherData {
  cod: string;
  message: number;
  list: WeatherListItem[];
  city: City;
}

