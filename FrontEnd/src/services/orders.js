import axios from 'axios';
const baseUrl = 'https://edset-6bd45293148f.herokuapp.com/api/order';

const OrdersService = {
  getOrders: function (token) {
    return axios.get(`${baseUrl}/customer/readAll`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },

  getOrder: function (token, id) {
    return axios.get(`${baseUrl}/customer/readOne/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },

  createOrder: function (token, body = {}) {
    return axios.post(`${baseUrl}/create`, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },

  cancelOrder: function (token, id) {
    return axios.patch(
      `${baseUrl}/cancelAll/${id}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
  },

  cancelPart: function (token, id, productData) {
    return axios.patch(
      `${baseUrl}/cancelOne/${id}`,
      {productData},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
  },
};

export default OrdersService;
