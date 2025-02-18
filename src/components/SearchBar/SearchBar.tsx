import { useState, FC, ChangeEvent, KeyboardEvent} from "react";
import s from "./SearchBar.module.scss";
import searchIcon from "../../assets/images/searchIcon.svg";
import searchIconWhite from "../../assets/images/searchIconWhite.svg";
import { useTheme } from "../../context/ThemeContext";
import { getCitySuggestions } from "../../API/geocoding";

interface SearchBarProps {
  onChange: (city: string) => void;
  initialValue?: string;
}

const SearchBar: FC<SearchBarProps> = ({ onChange, initialValue = "" }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { theme } = useTheme();
  let timeout: NodeJS.Timeout;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  
    clearTimeout(timeout);
    if (value.length > 1) {
      timeout = setTimeout(async () => {
        const cities = await getCitySuggestions(value);
        setSuggestions(cities.slice(0, 4));
      }, 300);
    } else {
      setSuggestions([]);
    }
  };
  

  const handleSelectCity = (city: string) => {
    setInputValue("");
    setSuggestions([]);
    onChange(city);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onChange(inputValue);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={s.searchbar}>
      <img
        className={s.searchbar__icon}
        src={theme === "dark" ? searchIconWhite : searchIcon}
        alt="Search Icon"
        onClick={handleSearch}
      />
      <input
        type="text"
        className={s.searchbar__input}
        placeholder="Search the city"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {suggestions.length > 0 && (
        <ul className={s.searchbar__suggestions}>
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSelectCity(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
