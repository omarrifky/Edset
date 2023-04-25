import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/user';

const UsersService = {
  login: function (body) {
    return axios.post(`${baseUrl}/login`, body);
  },
  logout: function () {
    return axios.post(`${baseUrl}/logout`);
  },
  register: function (body) {
    return axios.post(`${baseUrl}/registerUser`, body);
  },
  getUsers: function () {
    return axios.get(`${baseUrl}/getusers`);
  },
  getUser: function () {
    return axios.get(`${baseUrl}/viewmyinfo`);
  },
  updateUser: function (body = {}, token) {
    return axios.patch(`${baseUrl}/updatemyinfo`, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  addtoCart: function (body = {}, token) {
    return axios.patch(`${baseUrl}/addtocart`, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  removeOnefromCart: function (body = {}, token) {
    return axios.patch(`${baseUrl}/removefromcart/`, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  favorites: function (token) {
    return axios.get(`${baseUrl}/favorites`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  cart: function (token) {
    return axios.get(`${baseUrl}/getCart`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default UsersService;
