import axios from 'axios';
const baseUrl = 'https://edset-6bd45293148f.herokuapp.com/api/user';

const UsersService = {
  login: function (body) {
    return axios.post(`${baseUrl}/login`, body);
  },
  logout: function (token) {
    return axios.post(`${baseUrl}/logout`, {}, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
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
  updateAddress: function (body = {}, token) {
    return axios.patch(`${baseUrl}/updateAddress`, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
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
  clearCart: function (token) {
    return axios.patch(`${baseUrl}/clearcart`, {}, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default UsersService;
