import { useEffect, useState } from "react";
import s from "./App.module.scss";
import NavBar from "./components/Navbar/Navbar";
import { getWeatherByCity } from "./API/weather";
import { WeatherData, Nullable } from "./types/types";

function App() {
  const [weatherData, setWeatherData] = useState<Nullable<WeatherData>>(null);
  const [city, setCity] = useState("Kyiv");
  const [error, setError] = useState<Nullable<Error>>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCity(city);
        setWeatherData(data);
        console.log("Weather data fetched successfully:", data);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className={s.App}>
      <div className={s.App__content}>
        <div className={s.App__container}>
          {weatherData ? (
            <NavBar
              city={weatherData.city.name}
              country={weatherData.city.country}
              setCity={setCity}
            />
          ) : (
            <NavBar city={city} country="..." setCity={setCity} />
          )}
          {error && <p>Error fetching weather data: {error.message}</p>}
          {weatherData && weatherData.list && weatherData.list.length > 0 ? (
            <div>
              <h2>Weather in {weatherData.city.name}</h2>
              <p>Temperature: {weatherData.list[0].main.temp} °C</p>
              <p>Weather: {weatherData.list[0].weather[0].description}</p>
            </div>
          ) : (
            !error && <p>Loading weather data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
