import SearchBar from '../SearchBar/SearchBar';
import s from './Navbar.module.scss';

function NavBar(){
  return (
    <nav className={s.navbar}>
        <span className={s.navbar__location}>Vinnitsia , Ukraine</span>
        <SearchBar />
    </nav>
  );
};

export default NavBar;
