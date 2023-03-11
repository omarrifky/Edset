import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/product';

const ProductsService = {
    getProducts: function() {
        axios.get(`${baseUrl}/getallProducts`, {
          
        })
            .then(function (response) {
                console.log("RESS",response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    getProduct: function(id) {
        axios.get(`${baseUrl}/viewproduct/`+id, {
          
        })
            .then(function (response) {
                console.log("RESS",response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    },
};

export default ProductsService;