import createStore from 'unistore';
import axios from 'axios';

const initialState = {
	menuBarUser:'',
	menuBarSetting:'Pengaturan Akun',
	likeArticle:false,
	likeQuestion:false,
	likeAnswer:false,
	newArticle:'',
	selectedFile:null,
	uploadPhotoUrl:'https://api.pixhost.to/images',
	articleTitle:'',
	imageArticle:null,
	imageUrl:'',
	imageArticleUrl:'',
	menuBarUpload:false,
	wordCode:'',
	codeCompilerUrl:'https://cors-anywhere.herokuapp.com/api.paiza.io:80/runners/create',
	getCodeResultUrl :'https://cors-anywhere.herokuapp.com/api.paiza.io:80/runners/get_details',
	codeCompilerResult:'',
	uploadArticleEndPoint:'http://0.0.0.0:5000/posting/toplevel',
	username: '',
	password: '',
	email : '',
	job : '',
	responseData: null,
	responseStatus : null,
	menuBarSetting:'Pengaturan Akun'

}

export const store = createStore(initialState);

export const actions = (store) => ({
	changeInput : async (state,e) => {
		store.setState({
			articleTitle:e.target.value
		})
		await store.setState({ [e.target.name]: e.target.value});
	},
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
	codeCompiler : async (state) => {
		const source= state.wordCode     
		console.log('src',source) 
		const mydata = {
			source_code: source,
			language: 'c++',
			api_key: 'guest'      
		};
		const req = {
		  method: "post",
		  url: state.codeCompilerUrl,
		  headers: {
			"Content-Type": "application/json"
		  },
		  params: mydata
		};
		await axios(req)
		  	.then( async (response) => {
				const idResult= response.data.id      	  
				const finalData = {
					id: idResult,
					api_key: 'guest'      
				};
				const req = {
					method: "get",
					url: state.getCodeResultUrl,
					headers: {
						"Content-Type": "application/json"
					},
					params: finalData
				};
				await axios(req)
					.then(response => {
						store.setState({
							codeCompilerResult:response.data.stdout
						})
					})
					.catch(error => {
						return false
					})
		  })
		  .catch(error => {
			return false
		})
	},

	setGlobal : async (state, event) => {
		await store.setState({ [event.target.name]: event.target.value });
	},

	uploadArticle : async (state) => {
		const title = state.articleTitle
		const content_type = 'Artikel'
		const originArticle = state.newArticle
		const splitArticle = originArticle.split('"')
		const joinArticle = splitArticle.join(" '")
		const splitEnter = joinArticle.split("\n")
		const joinEnter = splitEnter.join('')
		const banner_photo_url = state.imageUrl   	  
		const articleDetails = {
			title : title,
			content_type : content_type,
			html_content : joinEnter,
			banner_photo_url : banner_photo_url
		};
		// articleDetails = JSON.stringify(articleDetails)
		const req = {
			method: "post",
			url: state.uploadArticleEndPoint,
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: articleDetails
		};
		// data=JSON.stringify(data)
		console.log(articleDetails)
		await axios(req)
			.then(response => {
				store.setState({
					menuBarUpload:false
				})
			})
			.catch(error => {
				return false
		})
	},

	uploadQuestion : async (state) => {
		const title = state.articleTitle
		const content_type = 'Pertanyaan'
		const originArticle = state.newArticle
		const splitArticle = originArticle.split('"')
		const joinArticle = splitArticle.join(" '")
		const banner_photo_url = state.imageUrl   	  
		const articleDetails = {
			"title" : title,
			"content_type" : content_type,
			"html_content" : joinArticle,
			"banner_photo_url" : banner_photo_url
		};
		const req = {
			method: "post",
			url: state.uploadArticleEndPoint,
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: articleDetails
		};
		await axios(req)
			.then(response => {
				store.setState({
					menuBarUpload:false
				})
			})
			.catch(error => {
				return false
		})
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
		console.warn('respon', responseData)
		if(responseData.hasOwnProperty("token")) {
			await localStorage.setItem("token", responseData.token)
			await localStorage.setItem("username", state.username)
			// await localStorage.setItem("email", )
		}
	},
	deleteResponse : async state => {
		await store.setState({ responseData : null, responseStatus : null })
	},
	afterSignOut : state => {
		localStorage.removeItem("token")
		localStorage.removeItem("username")
		localStorage.removeItem("email")
	}
})
