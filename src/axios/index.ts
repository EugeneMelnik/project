import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export function setAuthorizationHeader(token?: string) {
  if (token) {
    axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.authorization;
  }
}
