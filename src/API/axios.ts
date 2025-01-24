import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseURL = import.meta.env.VITE_WEATHER_API_URL;

const weatherApi = axios.create({
  baseURL: baseURL,
  params: {
    appid: apiKey,
    units: 'metric',
  },
});

export default weatherApi;
