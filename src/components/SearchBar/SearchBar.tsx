import { useState, FC, KeyboardEvent, ChangeEvent } from "react";
import s from "./SearchBar.module.scss";
import searchIcon from "../../assets/images/searchIcon.svg";

interface SearchBarProps {
  onChange: (city: string) => void;
  initialValue?: string;
}

const SearchBar: FC<SearchBarProps> = ({ onChange, initialValue = "" }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onChange(inputValue.trim());
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
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
