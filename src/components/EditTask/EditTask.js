import React from "react";

function EditTask({ isOpen, onClose, task, onPopupClick, editedTask }) {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    text: "",
  });

  const [checkbox, setCheckbox] = React.useState(false);

  React.useEffect(() => {
    setForm({
      username: task.username,
      email: task.email,
      text: task.text,
    });
  }, [task]);

  function handleInput(e) {
    setForm({ ...form, text: e.target.value });
  }

  function handleChange() {
    setCheckbox(!checkbox);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editedTask(form, checkbox);
  }

  return (
    <div
      className={`popup  ${isOpen ? "popup_opened" : false}`}
      onClick={onPopupClick}
    >
      <div className={"popup__container"}>
        <button
          onClick={onClose}
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
            value={task.username || ""}
            readOnly
          />
          <input className="popup__input" value={task.email || ""} readOnly />
          <textarea
            className="popup__text-area"
            rows="10"
            required
            value={form.text}
            onChange={handleInput}
          />
          <div className="popup__check">
            <input type="checkbox" value={checkbox} onChange={handleChange} />
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
