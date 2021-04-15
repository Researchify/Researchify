/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
import fooApi from './fooApi';


export const fetchFoos = () => fooApi.get('/foo');