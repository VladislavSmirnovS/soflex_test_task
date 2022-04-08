import "./Header.css";

import logo from "../../images/logo.png";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Task Board" />
      <h1 className="header__title">Task Manager</h1>
      {!props.loggedIn ? (
        <div className="header__auth">
          <button
            onClick={props.openLogin}
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
          <button
            onClick={props.signOut}
            className="header__login-btn"
            type="button"
          >
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
