import { apiConnector } from '../apiconnector';
import { endpoints } from '../api';

export const signUp = async (name, username, password) => {
  console.log("signup api run successfully  "  ,endpoints.SIGNUP_API);
    return apiConnector('POST', endpoints.SIGNUP_API, { name, username, password });
};
export const login = async (username, password) => {
  console.log("Login api run successfully  "  , endpoints.LOGIN_API);
    return apiConnector('POST', endpoints.LOGIN_API, { username, password });
};
export const createBlog = async (username, password) => {
  console.log("Login api run successfully  "  , endpoints.LOGIN_API);
    return apiConnector('POST', endpoints.LOGIN_API, { username, password });
};

  