import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

let instance = null;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  instance = axios.create({
    baseURL: 'http://localhost:8080/api'
  });
} else {
  const CSRF_TOKEN = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'))[1];

  instance = axios.create({
    baseURL: 'https://vc-system-server.herokuapp.com/api',
    headers: { 
      'X-XSRF-TOKEN': CSRF_TOKEN 
    }
  });
}


export default instance;
