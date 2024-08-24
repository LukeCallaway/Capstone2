import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class UserApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async setToken (token) {
    this.token = token;
    return token;
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${UserApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async register(data) {
    let res = await this.request('auth/register', data, 'post');
    return res;
  }

  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res;
  }

  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }


//   static async updateUserInfo(username, data) {
//     let res = await this.request(`users/${username}`, data, 'patch');
//     return res;

}

export default UserApi;