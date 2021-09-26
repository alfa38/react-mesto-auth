export default class ApiBaseClass {
  constructor({baseUrl, headers}) {
      console.log('crete, url', baseUrl);
      this._baseUrl = baseUrl;
      this._headers = headers;
  }

  _processResponse(response) {
      if (response.ok) {
          return response.json();
      } else {
          console.log(response);
          return Promise.reject(response.status);
      }
  }
}