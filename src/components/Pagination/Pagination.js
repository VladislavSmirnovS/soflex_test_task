import React from "react";
import "./Pagination.css";

function Pagination({ totalPage, page, changePage }) {
  const getPageArray = (totalPages) => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  };
  let pageArray = getPageArray(totalPage);

  return (
    <div className="pagination">
      {pageArray.map((i) => (
        <span
          key={i}
          className={
            page === i
              ? "pagination__page pagination__page_active"
              : "pagination__page"
          }
          onClick={() => changePage(i)}
        >
          {i}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
