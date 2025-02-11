import { useEffect, useState } from "react";
import s from "./App.module.scss";
import NavBar from "./components/Navbar/Navbar";
import { getWeatherByCity } from "./API/weather";
import { WeatherData } from "./types/weather";
import { Nullable } from "./types/narrowTypes";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import FutureDays from "./components/FutureDays/FutureDay/FutureDays";
import { ThemeProvider } from "./context/ThemeContext";

function AppContent() {
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
          <NavBar
            city={weatherData?.city.name || city}
            country={weatherData?.city.country || "UA"}
            setCity={setCity}
          />
          {error && <p>Error fetching weather data: {error.message}</p>}
          {weatherData ? (
            <CurrentWeather weatherData={weatherData} />
          ) : (
            !error && <p>Loading weather data...</p>
          )}
          <div className={s.App__futureDays}>
            <FutureDays weatherData={weatherData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
