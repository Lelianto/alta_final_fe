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
  listCode:[],
  wordCode:'',
  codeCompilerUrl:'https://cors-anywhere.herokuapp.com/api.paiza.io:80/runners/create',
  getCodeResultUrl :'https://cors-anywhere.herokuapp.com/api.paiza.io:80/runners/get_details',
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
		const mydata = {
			source_code: source,
			language: 'python3',
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
		  	.then(response => {			  
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
				axios(req)
				.then(response => {
					console.log('output code',response.data.stdout)
				})
				.catch(error => {
					return false
				})
		  })
		  .catch(error => {
			return false
		})
	},

	uploadFile : async (state) => {
		const file = state.selectedFile
		// console.log(file)
		const formData = new FormData();
		formData.append("file", file);
		const req = {
			method: "post",
			url: "http://0.0.0.0:5000/upload",
			headers: {
			  "Content-Type": "multipart/form-data"
			},
			data: {
				"file":file,
			}
		};
		console.log(req)
		await axios(req)
		.then(response => {
			console.log(response.data)
		})
		.catch(error => {
			return false
		})
		
	}
	
})
