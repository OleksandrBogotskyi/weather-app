import { useEffect, useState } from "react";
import s from "./App.module.scss";
import NavBar from "./components/Navbar/Navbar";
import { getWeatherByCity } from "./API/axios";
import { WeatherData } from "./API/types";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCity("Vinnytsia"); 
        setWeatherData(data);
        console.log("Weather data fetched successfully:", data);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className={s.App}>
      <div className={s.App__content}>
        <div className={s.App__container}>
          <NavBar />
          {error && <p>Error fetching weather data: {error.message}</p>}
          {weatherData && (
            <div>
              <h2>Weather in {weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;