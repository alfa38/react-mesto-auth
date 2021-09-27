import ApiBaseClass from "./apiBase";
import { authApiOptions } from "./constants";

class AuthApiClass extends ApiBaseClass {
  signUp(email, password) {
    console.log('baseUrl', this._baseUrl);
    console.log('header', this._headers);
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._processResponse);
  }
  // 400 - некорректно заполнено одно из полей
  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._processResponse);
  }
  // 400 - не передано одно из полей
  // 401 - пользователь с email не найден
  validateToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._processResponse);
    // # Если токен не передан или передан без Bearer
    // 400 — Токен не передан или передан не в том формате

    // # Если передан некорректный токен
    // 401 — Переданный токен некорректен
  }
}

const AuthApi = new AuthApiClass(authApiOptions);
export default AuthApi;
