import axios from 'axios';
const baseUrl = 'https://edset-297a67b6b6a9.herokuapp.com/api/supplier';

const SuppliersService = {
    getSuppliers: function(body = {}) {
        return axios.get(`${baseUrl}/readAll`, body)
    },

    getSupplier: function(id, body) {
        return axios.get(`${baseUrl}/readOne/${id}`, body)
    },
};

export default SuppliersService;