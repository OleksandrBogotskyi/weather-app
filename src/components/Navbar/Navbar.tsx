import SearchBar from "../SearchBar/SearchBar";
import lightThemeIcon from "../../assets/images/lightThemeIcon.svg";
import darkThemeIcon from "../../assets/images/darkThemeIcon.svg";
import s from "./Navbar.module.scss";

interface NavBarProps {
  city: string;
  country: string;
  setCity: (city: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function NavBar({
  city,
  country,
  setCity,
  theme,
  toggleTheme,
}: NavBarProps) {
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <nav className={`${s.navbar} ${s[theme]}`}>
      <span className={`${s.navbar__location} ${s[theme]}`}>
        {city}, {country}
      </span>
      <div className={s.navbar__navigation}>
        <img
          src={theme === "light" ? darkThemeIcon : lightThemeIcon}
          alt="Toggle Theme"
          className={s.navbar__themeIcon}
          onClick={toggleTheme}
        />
        <SearchBar onChange={handleCityChange} theme={theme} />
      </div>
    </nav>
  );
}
