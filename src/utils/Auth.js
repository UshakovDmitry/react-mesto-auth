import { checkResponse, AUTH_URL } from "./Utils";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = async ({ email, password }) => {
  const res = await fetch(`${AUTH_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
  return checkResponse(res);
};

export const authorize = async ({ email, password }) => {
  const res = await fetch(`${AUTH_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
   return checkResponse(res);
};

export const getContent = async (token) => {
  const res = await fetch(`${AUTH_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
   return checkResponse(res);
};
