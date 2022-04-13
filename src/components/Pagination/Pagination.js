import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSortedTasks, setCurrentPage } from "../../redux/actions/action";
import "./Pagination.css";

function Pagination() {
  const dispatch = useDispatch();
  const totalNumber = useSelector((state) => state.todo.totalNumber);
  const currentPage = useSelector((state) => state.todo.currentPage);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const sortDirection = useSelector((state) => state.todo.sortDirection);
  const totalPages = Math.ceil(totalNumber / 3);

  const changePage = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(getSortedTasks(sortCriteria, sortDirection, page));
  };

  const getPageArray = (totalPages) => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  };
  let pageArray = getPageArray(totalPages);

  return (
    <div className="pagination">
      {pageArray.map((i) => (
        <span
          key={i}
          className={
            currentPage === i
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
