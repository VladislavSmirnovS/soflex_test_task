import { useSelector, useDispatch } from "react-redux";
import {
  setModalVisible,
  setAdmin,
  setToken,
} from "../../redux/actions/action";
import "./Header.css";
import logo from "../../images/logo.png";

function Header() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.todo.isAdmin);

  function openSignin() {
    dispatch(
      setModalVisible({
        isVisible: true,
        type: "login",
      })
    );
  }

  function signOut() {
    dispatch(setAdmin(false));
    dispatch(setToken(""));
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("token", "");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Task Board" />
      <h1 className="header__title">Task Manager</h1>
      {!isAdmin ? (
        <div className="header__auth">
          <button
            onClick={openSignin}
            className="header__login-btn"
            type="button"
            aria-label="открыть логин"
          >
            Войти
          </button>
        </div>
      ) : (
        <div className="header__auth">
          <p className="header__text">Вы авторизованы</p>
          <button onClick={signOut} className="header__login-btn" type="button">
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
