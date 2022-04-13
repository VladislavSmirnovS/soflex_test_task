import { useSelector, useDispatch } from "react-redux";
import { getSortedTasks,  setModalVisible,setSortCriteria, setToken} from "../../redux/actions/action";
import React from "react";

import "./Sort.css";

function Sort() {
  const dispatch = useDispatch();
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const sortDirection = useSelector((state) => state.todo.sortDirection);
  
  function openAddTask () {
    dispatch(setModalVisible({
      isVisible: true,
      type: "taskAdd",
    }))
  } 

  
  function handleChange(e) {
    dispatch(setSortCriteria(e.target.value));
    dispatch(getSortedTasks(sortCriteria, sortDirection));
  }

  function sortUp() {
    dispatch(setSortCriteria("asc"));
    dispatch(getSortedTasks(sortCriteria, sortDirection));
  }

  function sortDown() {
    dispatch(setSortCriteria("desc"));
    dispatch(getSortedTasks(sortCriteria, sortDirection));
  }

  return (
    <div className="sort">
      <div className="sort__parametrs">
        <p className="sort__text"> Сортировать по:</p>
        <select
          className="sort__select"
          defaulvalue={"id"}
          onChange={handleChange}
        >
          <option value="id">По ID</option>
          <option value="username">По имени пользователя</option>
          <option value="email">По email</option>
          <option value="status">По статусу</option>
        </select>
        <div className="sort__dir">
          <button className="sort__dir-item" onClick={sortUp}>
            &#9650;
          </button>

          <button className="sort__dir-item" onClick={sortDown}>
            &#9660;
          </button>
        </div>
      </div>
      <button className="sort__btn-add" onClick={openAddTask}>
        Добавить задачу
      </button>
    </div>
  );
}

export default Sort;