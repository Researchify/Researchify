/*
This file handles all the api calls for fetching or updating user credentials (i.e. log in details)
*/

import axios from "axios";

const usingRp = false;
const localServerUrl = usingRp ? '/' : 'http://localhost:5000';

export default axios.create({
    baseURL: localServerUrl
});

