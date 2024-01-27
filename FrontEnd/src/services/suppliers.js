import axios from 'axios';
const baseUrl = 'https://edset-6bd45293148f.herokuapp.com/api/supplier';

const SuppliersService = {
    getSuppliers: function(body = {}) {
        return axios.get(`${baseUrl}/readAll`, body)
    },

    getSupplier: function(id, body) {
        return axios.get(`${baseUrl}/readOne/${id}`, body)
    },
};

export default SuppliersService;