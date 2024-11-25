import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Pagination.module.scss";
import { leftArrow } from "../images/Images";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxDisplayedPages; i++) {
        pages.push(i);
      }
      pages.push("...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...");
      for (let i = totalPages - (maxDisplayedPages - 1); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, "...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...", totalPages);
    }
    return pages;
  };

  return (
    <div className={cx(styles.pagination)}>
      <button
        className={cx(styles.navButton, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          src={leftArrow}
          alt="left arrow"
          style={{ width: "15px", height: "15px" }}
        />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={cx(styles.pageButton, {
              [styles.active]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={cx(styles.navButton, {
          [styles.disabled]: currentPage === totalPages,
        })}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <img
          src={leftArrow}
          alt="left arrow"
          style={{ width: "15px", height: "15px", transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
