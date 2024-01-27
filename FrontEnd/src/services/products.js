import axios from 'axios';
const baseUrl = 'https://edset-6bd45293148f.herokuapp.com/api/product';

const ProductsService = {
    getProducts: function(body = {}) {
        return axios.post(`${baseUrl}/getallProducts`, body)
    },

    getProduct: function(id, body) {
        return axios.get(`${baseUrl}/viewproduct/${id}`, body)
    },
};

export default ProductsService;