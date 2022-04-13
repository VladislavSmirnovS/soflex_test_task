import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalVisible,
  updateTask,
  getSortedTasks,
} from "../../redux/actions/action";

function EditTask() {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    text: "",
  });

  const [checkbox, setCheckbox] = React.useState(false);
  const token = useSelector((state) => state.todo.token);
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.todo.isModalVisible);

  const closePopup = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__button-close")
    ) {
      dispatch(setModalVisible({ isVisible: false }));
      setCheckbox(false);
    }
  };

  React.useEffect(() => {
    setForm({
      username: isModalVisible.username,
      email: isModalVisible.email,
      text: isModalVisible.text,
    });
  }, [isModalVisible]);

  function handleInput(e) {
    setForm({ ...form, text: e.target.value });
  }

  function handleChange() {
    setCheckbox(!checkbox);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let task = new FormData();
    task.append("username", form.username);
    task.append("token", token);
    task.append("email", form.email);
    task.append("text", form.text);
    let status = 0;
    if (form.text === isModalVisible.text) {
      if (checkbox) {
        status = 10;
      }
    } else {
      if (checkbox) {
        status = 11;
      } else {
        status = 1;
      }
    }
    task.append("status", status);
    dispatch(setModalVisible({ isVisible: false, type: "taskEdit" }));
    dispatch(updateTask(task, isModalVisible.id, token));
    dispatch(getSortedTasks());
    // setCheckbox(false);
  }

  return (
    <div
      className={`popup  ${
        isModalVisible.isVisible && isModalVisible.type === "taskEdit"
          ? "popup_opened"
          : false
      }`}
      onClick={closePopup}
    >
      <div className={"popup__container"}>
        <button
          onClick={closePopup}
          className="popup__button-close"
          type="button"
          aria-label="Закрыть окно"
        >
          &#10006;
        </button>
        <h2 className="popup__title">Редактирование задачи</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          <input
            className="popup__input"
            value={form.username || ""}
            readOnly
          />
          <input className="popup__input" value={form.email || ""} readOnly />
          <textarea
            className="popup__text-area"
            rows="10"
            required
            value={form.text}
            onChange={handleInput}
          />
          <div className="popup__check">
            <input type="checkbox" checked={checkbox} onChange={handleChange} />
            <label>Задача выполнена</label>
          </div>
          <button className="popup__btn" type="submit">
            Редактировать задачу
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
