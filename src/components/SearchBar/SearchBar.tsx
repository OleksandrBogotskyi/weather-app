import s from "./SearchBar.module.scss";
import searchIcon from "../../assets/images/searchIcon.svg";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function SearchBar(props: Props) {
  return (
    <div className={s.searchbar}>
      <img className={s.searchbar__icon} src={searchIcon} alt="searchIcon" />
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        className={s.searchbar__input}
        placeholder="Search the city"
      />
    </div>
  );
}
