import { useState, FC, ChangeEventHandler, KeyboardEvent } from "react";
import s from "./SearchBar.module.scss";
import searchIcon from "../../assets/images/searchIcon.svg";

interface SearchBarProps {
  setCity: (city: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ setCity }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      setCity(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={s.searchbar}>
      <img
        className={s.searchbar__icon}
        src={searchIcon}
        alt="Search Icon"
        onClick={handleSearch}
      />
      <input
        type="text"
        className={s.searchbar__input}
        placeholder="Search the city"
        value={inputValue}
        onChange={(e) => handleInputChange(e)} // Using arrow function for onChange
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
