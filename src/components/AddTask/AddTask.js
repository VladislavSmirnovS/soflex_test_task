import React from "react";

function AddTask({ isOpen, onClose, onPopupClick, addCard }) {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    text: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    addCard(form);
    setForm({
      username: "",
      email: "",
      text: "",
    });
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
