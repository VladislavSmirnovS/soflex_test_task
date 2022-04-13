import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalVisible, addNewTask } from "../../redux/actions/action";

function AddTask() {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    text: "",
  });

  const token = useSelector((state) => state.todo.token);
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.todo.isModalVisible);

  const closePopup = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__button-close")
    ) {
      dispatch(setModalVisible({ isVisible: false}));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    let task = new FormData();
    task.append("username", form.username);
    task.append("token", token);
    task.append("email", form.email);
    task.append("text", form.text);

    dispatch(addNewTask(task));
    dispatch(
      setModalVisible({ isVisible: false, type: "taskAdd"})
    );
    setForm({
      username: "",
      email: "",
      text: "",
    });
  }

  return (
    <div
      className={`popup  ${
        isModalVisible.isVisible && isModalVisible.type === "taskAdd"
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
        <h2 className="popup__title">Добавление задачи</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          <input
            className="popup__input"
            type="text"
            placeholder="Имя"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            className="popup__input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            className="popup__text-area"
            placeholder="Текст задачи"
            cols="30"
            rows="10"
            required
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <button className="popup__btn" type="submit">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
