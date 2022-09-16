import axios from 'axios'

// const token = localStorage.getItem('chat_access_token'); 
// const token = 'FLWSECK_TEST-SANDBOXDEMOKEY-X'
const config = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_BASE_URL
    baseURL:"https://kiraworld-backend.herokuapp.com/v1"
    // baseURL:"http://127.0.0.1:4200/v1"
})
// config.defaults.headers.common['Authorization'] = `Bearer ${token}`;
config.defaults.headers.post['Content-Type'] ='application/json';

export default config;