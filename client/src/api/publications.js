import axios from 'axios';


 const usingRp = false;
 const localServerUrl = usingRp ? '/api' : 'http://localhost:5000';
 
 export default axios.create({
     baseURL: localServerUrl
 });