import axios from 'axios';

const usingRp = true;
const localServerUrl = usingRp ? '/api' : 'http://localhost:5000';

export default axios.create({
    baseURL: localServerUrl,
    withCredentials: true
});