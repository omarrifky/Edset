import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/user';

const UsersService = {
    login: function(){
//TODO
    },
    logout: function(){
//TODO
    },
    register: function(){
//TODO
    },
    getUsers: function() {
        const res = axios.get(`${baseUrl}/getusers`, {
          
        })
            .then(function (response) {
             user = response.data;
                return response.data;
                
            })

            .catch(function (error) {
                console.log(error);
            })
          
    },

    getUser: function(id) {
        axios.get(`${baseUrl}/viewuser/`+id, {
          
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

export default UsersService;