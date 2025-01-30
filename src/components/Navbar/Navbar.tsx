import SearchBar from "../SearchBar/SearchBar";
import s from "./Navbar.module.scss";

interface NavBarProps {
  city: string;
  country: string;
  setCity: (city: string) => void;
}

export default function NavBar({ city, country, setCity }: NavBarProps) {
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <nav className={s.navbar}>
      <span className={s.navbar__location}>
        {city}, {country}
      </span>
      <SearchBar onChange={handleCityChange}/>
    </nav>
  );
}
