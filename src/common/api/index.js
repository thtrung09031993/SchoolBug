import store from 'common/store';
import { START_LOADING, FINISH_LOADING } from 'constants/action';

class API {
  constructor() {
    if (!API.instance) {
      API.instance = this;
    }

    return API.instance;
  }

  /**
   * Add base url once only for further usage
   * @param {string} baseUrl      The base url of api domain
   * @return {undefined}
   */
  addBaseUrl = baseUrl => {
    this.baseUrl = baseUrl;
  }

  /**
   * Add token once only for further usage
   * @param {string} token        API Token
   * @return {undefined}
   */
  addToken = token => {
    this.token = token;
  }

  /**
   * Add token once only for further usage
   * @param {Object} apiDetail      Object { url, method, data, options }
   * @return {Promise}              Promise to resolve API response object
   */
  callApi = ({ url, method, data, options }) => {
    store.store.dispatch({ type: START_LOADING });

    let apiUrl = null;

    let body = null;
    const headers = { "Content-Type": "application/json" };

    if (method === 'GET' || method === 'DELETE') {
      let params = '';

      for (let param in data) {
        params += params ? `&${param}=${data[param]}` : `?${param}=${data[param]}`;
      }

      apiUrl = `${this.baseUrl}${url}${params}`;
      body = undefined;
    } else {
      apiUrl = `${this.baseUrl}${url}`;
      body = JSON.stringify(data);
    }

    const apiOptions = { method, headers, body, ...options };

    if (this.token) {
      apiOptions.headers.Authorization = `Bearer ${this.token}`;
    }

    return new Promise((resolve, reject) => {
      fetch(apiUrl, apiOptions).then(res => {
        store.store.dispatch({ type: FINISH_LOADING });
        if (res.ok) {
          res.json().then(result => resolve(result));
        } else {
          res.json()
            .then(result => reject({ ...result, status: res.status }))
            .catch(err => reject({ message: err, status: res.status }));
        }
      }).catch(err => {
        store.store.dispatch({ type: FINISH_LOADING });
        reject(err);
      });
    });
  }

  get = (url, data, options) => this.callApi({ url, method: 'GET', data, options });
  post = (url, data, options) => this.callApi({ url, method: 'POST', data, options });
  put = (url, data, options) => this.callApi({ url, method: 'PUT', data, options });
  patch = (url, data, options) => this.callApi({ url, method: 'PATCH', data, options });
  delete = (url, data, options) => this.callApi({ url, method: 'DELETE', data, options });
}

export default new API();
