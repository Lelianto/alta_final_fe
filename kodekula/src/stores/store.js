import createStore from 'unistore';
import axios from 'axios';
import Swal from "sweetalert2"

const initialState = {
  
};

export const store = createStore(initialState);

export const actions = store => ({

    showPassword : (state, id, idImage) => {
        let imgPassword = document.getElementById(idImage);
        if (imgPassword.innerHTML == 'visibility') {
            imgPassword.innerHTML = 'visibility_off';
        } else {
            imgPassword.innerHTML = 'visibility';
        }
        
        let password = document.getElementById(id);
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
        
    }
});