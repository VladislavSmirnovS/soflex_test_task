import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalVisible , login} from "../../redux/actions/action";


function Login() {
  const dispatch = useDispatch();
  const [log, setLog] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isModalVisible = useSelector((state) => state.todo.isModalVisible);
 
  const closePopup = (e) => {
    if (e.target.classList.contains("popup") || e.target.classList.contains("popup__button-close") ) { dispatch(setModalVisible({ isVisible: false}));}
   
  };
 
  function handleLoginInput(evt) {
    setLog(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("username", log);
    formData.append("password", password);
    dispatch(login(formData));
    dispatch(setModalVisible({ isVisible: false, type: "login" }));
    localStorage.setItem("isAdmin", "true");
    setLog("");
    setPassword("");
  }

  return (
    <div
      className={`popup  ${isModalVisible.isVisible  &&
        isModalVisible.type === "login" ? "popup_opened" : false}`}
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
        <h2 className="popup__title">Введите логин и пароль</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          <input
            className="popup__input"
            type="text"
            placeholder="Логин"
            value={log || ""}
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
