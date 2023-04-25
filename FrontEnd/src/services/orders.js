import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/order';

const OrdersService = {
    getOrders: function(token) {
        return axios.get(`${baseUrl}/customer/readAll`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
    },

    getOrder: function(token, id) {
        return axios.get(`${baseUrl}/customer/readOne/${id}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
    },
    
    createOrder: function(token, body = {}) {
        return axios.post(`${baseUrl}/create`, body, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
    },
};

export default OrdersService;