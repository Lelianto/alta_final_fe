import createStore from 'unistore';
import axios from 'axios';

const initialState = {
	menuBarUser: '',
	likeArticle: false,
	likeQuestion: false,
	likeAnswer: false,
	username: '',
	password: '',
	email : '',
	job : '',
	responseData: null,
	responseStatus : null
};

export const store = createStore(initialState);

export const actions = (store) => ({
	showPassword: (state, id, idImage) => {
		let imgPassword = document.getElementById(idImage);
		if (imgPassword.innerHTML == 'visibility') {
			imgPassword.innerHTML = 'visibility_off';
		} else {
			imgPassword.innerHTML = 'visibility';
		}

		let password = document.getElementById(id);
		if (password.type === 'password') {
			password.type = 'text';
		} else {
			password.type = 'password';
		}
	},
	setGlobal : async (state, event) => {
		await store.setState({ [event.target.name]: event.target.value });
	},
	handleAPI : async (state, parameters) => {
		await axios(parameters)
			.then(async (response) => {
				await store.setState({responseStatus : response.status})
				if (response.status === 200) {
					await store.setState({responseData : response.data})
				}
			})
			.catch(async (error) => {
				await console.warn(error)
			})
	},
	getToken : async state => {
		const responseData = state.responseData
		if(responseData.hasOwnProperty("token")) {
			await localStorage.setItem("token", responseData.token)
			await localStorage.setItem("isLogin", "true")
			await localStorage.setItem("username", state.username)
			await localStorage.setItem("email", state.email)
		}
	},
	deleteResponse : async state => {
		await store.setState({ responseData : null, responseStatus : null })
	}
});
