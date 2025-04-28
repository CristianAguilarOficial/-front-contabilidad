import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);
export const logoutRequest = () => axios.post(`/logout`);
export const forgotPasswordRequest = (email) =>
  axios.post(`/forgot-password`, { email });
export const resetPasswordRequest = (token, password) =>
  axios.post(`/reset-password/${token}`, { password });
export const verifyResetTokenRequest = (token) =>
  axios.get(`/verify-reset-token/${token}`);
