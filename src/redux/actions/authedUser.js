import { LOGIN_USER, LOGOUT_USER } from "../types";

export function loginUser(id) {
  return {
    type: LOGIN_USER,
    id,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
