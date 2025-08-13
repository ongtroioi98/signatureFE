import { API_HOST, API_VERSION } from ".";

export const PATH = API_HOST + `/${API_VERSION}`;
export const API_IAM = {
  USER: {
    LOGIN: PATH + "/login/local",
    AUTHORITY: PATH + "/users/me/authority",
    PROFILE: PATH + "/accounts/me",
    SIGNATURES: PATH + "/signatures",
    REQUEST_APPROVE_SIGNATURE: PATH + "/signatures",
  },
  AUTH_API: {
    REFRESH_TOKEN: PATH + "/refresh-token",
    LOGIN_AD: "",
    LOGIN_LOCAL: "",
    LOGOUT: "",
    IGNORE_401_PATH: "/public",
  },
};
