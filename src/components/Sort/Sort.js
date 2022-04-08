import "./Sort.css";

function Sort({
  serSortDirection,
  serSortField,
  openAddTask,
  getTasks,
}) {
  function handleChange(e) {
    serSortField(e.target.value);
    getTasks();
  }

  function sortUp() {
    serSortDirection("asc");
  }

  function sortDown() {
    serSortDirection("desc");
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
