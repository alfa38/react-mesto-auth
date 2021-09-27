import React, { useState } from 'react';

const Login = ({ onSubmit }) => {
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'email':
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
    onSubmit(email, password);
  }

  return (
    <section className="auth-page">
      <form name={`form-auth`} className="edit-form edit-form_auth" onSubmit={handleSubmit}>
        <h2 className="edit-form__header edit-form__header_auth">Вход</h2>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          id="input-name"
          className="edit-form__input edit-form__input_edit_name edit-form__input_auth"
          type="email"
          placeholder="Email"
          required
        />
        <input
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
          className={`edit-form__button edit-form__button_auth edit-form__button_type_save-changes}`}
          type="submit"
          aria-label={'Войти'}>
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;