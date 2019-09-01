import axios from 'axios';

let instance = null;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  instance = axios.create({
    withCredentials: true,
    baseURL: '/api'
  });
} else {
  // Remove comments from CSRT_TOKEN variable and the X-XSRF-TOKEN header for production.
  // Also replace the 'baseURL' value with the correct value for the server backend (e.g. Heroku).

  // const CSRF_TOKEN = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'))[1];
  
  axios.get('/api/auth/csrf-token').then(res => console.log(res));

  instance = axios.create({
    withCredentials: true,
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://206.81.27.39/api',
    headers: { 
      // 'X-XSRF-TOKEN': '12345',
      'Access-Control-Allow-Methods': 'PATCH, DELETE, POST, GET, OPTIONS, PUT'
    }
  });
}

// const instance = axios.create({
//   baseURL: 'http://localhost:8080/api/'
// });

export default instance;
