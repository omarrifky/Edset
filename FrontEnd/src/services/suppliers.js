import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/supplier';

const SuppliersService = {
    getSuppliers: function(body = {}) {
        return axios.get(`${baseUrl}/readAll`, body)
    },

    getSupplier: function(id, body) {
        return axios.get(`${baseUrl}/readOne/${id}`, body)
    },
};

export default SuppliersService;