export default class ApiBaseClass {
  constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
  }

  _processResponse(response) {
      if (response.ok) {
          return response.json();
      } else {
          return Promise.reject(response.status);
      }
  }
}