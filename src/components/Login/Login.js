import React from "react";
function Login({ isOpen, onClose, onPopupClick, loginUser }) {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLoginInput(evt) {
    setLogin(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    loginUser(formData);
    setLogin("");
    setPassword("");
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
        <h2 className="popup__title">Введите логин и пароль</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          <input
            className="popup__input"
            type="text"
            placeholder="Логин"
            value={login || ""}
            onChange={handleLoginInput}
            required
          />
          <input
            className="popup__input"
            type="password"
            placeholder="Пароль"
            value={password || ""}
            onChange={handlePasswordInput}
            required
          />
          <button className="popup__btn" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
