/**
 * This file uses the custom axios client and defines the possible requests that can be made.
 */
import fooApi from "./fooApi";
import userApi from "./userApi";

/**
 * Posts the user data (email, given and family name and password) to api at endpoint '/'
 * @param {*} payload object containing email, givenName, familyName and password of the user
 */
// export const addUserData = (payload) =>
//   userApi({
//     method: "post",
//     url: "/",
//     data: payload,
//   });
export const addUserData = (payload) =>
  userApi.post("/users", payload);

export const fetchFoos = () => fooApi.get("/foo");
