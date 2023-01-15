const TOKEN_KEY = "access_token";
const USER_UUID_KEY = "user_uuid";

const TokenService = {
  removeAllKeys() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_UUID_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY) || "";
  },
  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUserUuid() {
    return localStorage.getItem(USER_UUID_KEY) || "HHHHH";
  },
  saveUserUuid(userUuid) {
    localStorage.setItem(USER_UUID_KEY, userUuid);
  },
  removeUserUuid() {
    localStorage.removeItem(USER_UUID_KEY);
  },
};

export { TokenService };
