import PropTypes from "prop-types";
import cx from "classnames";
import s from "./SearchComponent.module.scss";
import { search } from "../images/Images";

const SearchComponent = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
}) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={cx(s.searchContainer)}>
      <div className={s.searchIcon}>
        <img src={search} alt="search icon" className={s.icon} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder}
        className={cx(s.searchInput)}
      />
    </div>
  );
};

SearchComponent.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchComponent;
