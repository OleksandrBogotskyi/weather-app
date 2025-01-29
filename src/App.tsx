import { useEffect, useState } from "react";
import s from "./App.module.scss";
import NavBar from "./components/Navbar/Navbar";
import { getWeatherByCity } from "./API/weather";
import { WeatherData } from "./types/weather";
import { Nullable } from "./types/narrowTypes";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

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

  const weatherContent = weatherData && weatherData.list && weatherData.list.length > 0 ? (
    <CurrentWeather weatherData={weatherData} />
  ) : (
    !error && <p>Loading weather data...</p>
  );

  return (
    <div className={s.App}>
      <div className={s.App__content}>
        <div className={s.App__container}>
          {weatherData ? (
            <NavBar
              key={weatherData.city.name}
              city={weatherData.city.name}
              country={weatherData.city.country}
              setCity={setCity}
            />
          ) : (
            <NavBar key={city} city={city} country="..." setCity={setCity} />
          )}
          {error && <p>Error fetching weather data: {error.message}</p>}
          {weatherContent}
        </div>
      </div>
    </div>
  );
}

export default App;
