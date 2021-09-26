import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

const Header = ({ onSignOut, email }) => {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">Войти</Link>
        </Route>
        <Route path="/">
          <div className="header__menu-container">
            <p className="header__email">{email}</p>
            <p className="header__signout" onClick={onSignOut}>Выйти</p>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;