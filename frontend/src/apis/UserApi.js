import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class UserApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async setToken (token) {
    this.token = token;
    return token;
  }

  static async request(endpoint, method = "get",  data = {}) {
    console.debug("API Call:", endpoint, method, data);

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
    // return (await axios({ url, method, data, params, headers })).data;
  }

  // Individual API routes

  static async register(data) {
    const res = await this.request('auth/register', 'post', data);
    return res;
  }

  static async login(data) {
    const res = await this.request('auth/token', 'post', data);
    return res;
  }

  static async getUserInfo(username) {
    const res = await this.request(`users/${username}`);
    return res;
  }

  static async addUserMeal(username, data){
    const res = await this.request(`meals/${username}`, 'post', data)
    return res;
  }

  static async deleteUserMeal(username, id){
    const res = await this.request(`meals/${username}/${id}`, 'delete');
    return res;
  }
//   static async updateUserInfo(username, data) {
//     let res = await this.request(`users/${username}`, data, 'patch');
//     return res;

}

export default UserApi;