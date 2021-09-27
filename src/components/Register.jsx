import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Register = ({onSubmit}) => {
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'name':
        SetEmail(value);
        break;
      case 'password':
        SetPassword(value);
        break;
      default:
        break;
    }

    

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handler REg')
    onSubmit(email, password);
  }
  return (
    <section className="auth-page">
      <form name={`form-auth`} className="edit-form edit-form_auth" onSubmit={handleSubmit}>
        <h2 className="edit-form__header edit-form__header_auth">Регистрация</h2>
        <input
          minLength="2"
          maxLength="40"
          name="name"
          value={email}
          onChange={handleChange}
          id="input-name"
          className="edit-form__input edit-form__input_auth"
          type="email"
          placeholder="Email"
          required
        />
        <input
          minLength="8"
          maxLength="200"
          name="password"
          value={password}
          onChange={handleChange}
          id="input-profession"
          className="edit-form__input edit-form__input_auth"
          type="password"
          placeholder="Пароль"
          required
        />
        <button
          className={`edit-form__button edit-form__button_auth edit-form__button_type_save-changes`}
          type="submit"
          aria-label={'Зарегистрироватся'}>
          Зарегистрироватся
        </button>
      </form>
      <p className="auth-page__caption">Уже зарегистрированы? <Link to="/sign-in" className="auth-page__link">Войти</Link></p>
    </section>
  );
}

export default Register;
