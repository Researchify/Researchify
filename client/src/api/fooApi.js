/**
 * This file exports a custom axios client for our own API server which handles all requests associated with posts.
 */
import axios from 'axios';


const localServerUrl = 'http://localhost:5000';

export default axios.create({
    baseURL: localServerUrl
});