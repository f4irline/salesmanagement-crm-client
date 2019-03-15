import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

/**
 * Production instance
 * 
const CSRF_TOKEN = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'))[1];

const instance = axios.create({
  baseURL: 'https://vc-system-server.herokuapp.com/',
  headers: { 
    'X-XSRF-TOKEN': CSRF_TOKEN 
  }
});
 */

const instance = axios.create({
  baseURL: 'http://localhost:8080'
});

export default instance;
