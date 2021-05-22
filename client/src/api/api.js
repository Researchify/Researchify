/**
 * This file exports a custom axios client for our own API server which handles all requests to the server.
 *
 * @note: If this React client is being served by a reverse proxy, the localServerUrl is used as a *relative*
 * URL to point to the "/api" route, and the reverse proxy is expected to proxy the request to the API server.
 * see: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#absolute_urls_vs_relative_urls
 */
import axios from 'axios';

const usingRp = false;
const localServerUrl = usingRp ? '/api' : 'http://localhost:5000';

export default axios.create({
    baseURL: localServerUrl
});
