import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/user';

const UsersService = {
    getUsers: function() {
        axios.get(`${baseUrl}/getusers`, {
          
        })
            .then(function (response) {
                console.log("RESS",response);
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    getUser: function() {
        //inspect the value
    }
};

export default UsersService;