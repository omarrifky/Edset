import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/product';

const ProductsService = {
    getProducts: function(body = {}) {
        return axios.post(`${baseUrl}/getallProducts`, body)
    },

    getProduct: function(id, body) {
        return axios.get(`${baseUrl}/viewproduct/${id}`, body)
    },
};

export default ProductsService;