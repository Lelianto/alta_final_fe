import createStore from 'unistore';
import axios from 'axios';

const initialState = {
	menuBarUser: '',
	menuBarSetting: 'Pengaturan Akun',
	likeArticle: false,
	likeQuestion: false,
	likeAnswer: false,
	newArticle: '',
	selectedFile: null,
	uploadPhotoUrl: 'https://api.pixhost.to/images',
	articleTitle : '',
	imageArticle: null,
	imageUrl: '',
	imageArticleUrl: '',
	menuBarUpload: false,
	wordCode: '',
	codeCompilerUrl: 'https://cors-anywhere.herokuapp.com/api.paiza.io:80/runners/create',
	getCodeResultUrl: 'https://cors-anywhere.herokuapp.com/api.paiza.io:80/runners/get_details',
	codeCompilerResult: '',
	baseUrl: 'http://13.229.122.5:5000',
	username: '',
	password: '',
	email: '',
	job: '',
	locationPage: null,
	articleId : '',
	userInterest: [],
	interestList: [],
	filterInterest: [],
	excludeTags: [],
	responseData: null,
	responseStatus : null,
	menuBarSetting:'Pengaturan Akun',
	tagWritings:[],
	startComment: false,
	userId:'',
	questionId:'',
	keyword : '',
	allArticleDatabase:{},
	isLoading:true,
	seeComment:false,
	lastArticleQuestion:'',
	firstData:'',
	startNew:true,
	userDetail:{},
	userData : {},
	userTagData : [],
	waiting:true,
	tags : [],
	urlProfile : '',
	uname : '',
	popularArticle : [],
	popularQuestion : [],
	popularLoading : true
}

export const store = createStore(initialState);

export const actions = (store) => ({
	changeInput: async (state, e) => {
		const title = await e.target.value
		await store.setState({ articleTitle: title });
	},

	/**
	 * @function showPassword
	 * @param { String } id
	 * @param { String } idImage
	 * @returns { String } imgPassword.innerHTML
	 * @returns { String } password.type
	 */
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
	
	setInput : (state, event) => {
		store.setState({[event.target.name] : event.target.value})
	},

	codeCompiler : async (state) => {
		const source= state.wordCode     
		console.log('src',source) 
		const mydata = {
			source_code: source,
			language: 'python3',
			api_key: 'guest'      
		};
		const req = {
			method: 'post',
			url: state.codeCompilerUrl,
			headers: {
				'Content-Type': 'application/json'
			},
			params: mydata
		};
		await axios(req)
			.then(async (response) => {
				const idResult = response.data.id;
				const finalData = {
					id: idResult,
					api_key: 'guest'
				};
				const req = {
					method: 'get',
					url: state.getCodeResultUrl,
					headers: {
						'Content-Type': 'application/json'
					},
					params: finalData
				};
				await axios(req)
					.then((response) => {
						store.setState({
							codeCompilerResult: response.data.stdout
						});
					})
					.catch((error) => {
						return false;
					});
			})
			.catch((error) => {
				return false;
			});
	},

	compileCode: async (state) => {
		store.setState({
			waiting: true
		})
		const input = {
			clientId:"7ca457a9e69e521b689e09b0ce2bc0d9",
			clientSecret:"2bba055e98a958d83de4a9d59e8b1efe46c04e77b5b9ef825d2484675a98fc48",
			language:"python3",
			script: state.wordCode 
		}
		const req = {
			method: 'post',
			url: "https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute ",
			headers: {
				'Content-Type': 'application/json'
			},
			data: input
		};
		await axios(req)
			.then((response) => {
				store.setState({
					codeCompilerResult: response.data.output
				});
			})
			.catch((error) => {
				return false;
			});
	},

	setGlobal: async (state, event) => {
		await store.setState({ [event.target.name]: event.target.value });
		await console.warn('article title', state.articleTitle)
	},

	uploadArticle: async (state) => {
		const title = state.articleTitle;
		const content_type = 'article';
		const originArticle = state.newArticle;
		const splitArticle = originArticle.split('"');
		const joinArticle = splitArticle.join(" '");
		const splitEnter = joinArticle.split('\n');
		const joinEnter = splitEnter.join('');
		const banner_photo_url = state.imageUrl;
		const articleDetails = {
			title: title,
			content_type: content_type,
			html_content: joinEnter,
			banner_photo_url: banner_photo_url,
			tags : state.tags
		};
		// articleDetails = JSON.stringify(articleDetails)
		const req = {
			method: 'post',
			url: state.baseUrl + '/posting/toplevel',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: articleDetails
		};
		// data=JSON.stringify(data)
		console.log(articleDetails);
		await axios(req)
			.then((response) => {
				console.log(response.data)
				store.setState({
					menuBarUpload:false,
					articleTitle:'',
					newArticle:'',
					imageUrl:''
				})
			})
			.catch((error) => {
				console.log(error)
				return false;
			});
	},

	uploadQuestion : async (state) => {
		const title = state.articleTitle
		const content_type = 'question'
		const originArticle = state.newArticle
		const splitArticle = originArticle.split('"')
		const joinArticle = splitArticle.join(" '")
		const splitEnter = joinArticle.split("\n")
		const joinEnter = splitEnter.join('')
		const banner_photo_url = state.imageUrl   	  
		const articleDetails = {
			"title" : title,
			"content_type" : content_type,
			"html_content" : joinEnter,
			"banner_photo_url" : banner_photo_url,
			"tags" : state.tags
		};
		const req = {
			method: 'post',
			url: state.baseUrl + '/posting/toplevel',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: articleDetails
		};
		await axios(req)
			.then((response) => {
				store.setState({
					menuBarUpload:false,
					articleTitle:'',
					newArticle:'',
					imageUrl:''
				})
			})
			.catch((error) => {
				return false;
			});
	},

	updateArticle: async (state) => {
		const title = state.articleTitle;
		const content_type = 'article';
		const originArticle = state.lastArticleQuestion;
		const splitArticle = originArticle.split('"');
		const joinArticle = splitArticle.join(" '");
		const splitEnter = joinArticle.split('\n');
		const joinEnter = splitEnter.join('');
		const banner_photo_url = state.imageUrl;
		const articleDetails = {
			title: title,
			content_type: content_type,
			html_content: joinEnter,
			banner_photo_url: banner_photo_url,
			content_status:0,
			tags : state.tags
		};
		// articleDetails = JSON.stringify(articleDetails)
		console.log('isi req article', articleDetails)
		const req = {
			method: 'put',
			url: state.baseUrl + '/posting/toplevel/' + state.articleId,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: articleDetails
		};
		// data=JSON.stringify(data)
		console.log(articleDetails);
		await axios(req)
			.then((response) => {
				store.setState({
					menuBarUpload:false,
					articleTitle:'',
					newArticle:'',
					imageUrl:'',
					lastArticleQuestion:''
				})
				return response
			})
			.catch((error) => {
				return false;
			});
	},

	delArticle: async (state) => {
		const title = state.articleTitle;
		const content_type = 'article';
		const originArticle = state.lastArticleQuestion;
		const splitArticle = originArticle.split('"');
		const joinArticle = splitArticle.join(" '");
		const splitEnter = joinArticle.split('\n');
		const joinEnter = splitEnter.join('');
		const banner_photo_url = state.imageUrl;
		const articleDetails = {
			title: title,
			content_type: content_type,
			html_content: joinEnter,
			banner_photo_url: banner_photo_url,
			content_status:2
		};
		console.log('isi req article', articleDetails)
		const req = {
			method: 'put',
			url: state.baseUrl + '/posting/toplevel/' + state.articleId,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: articleDetails
		};
		// data=JSON.stringify(data)
		console.log(articleDetails);
		await axios(req)
			.then((response) => {
				store.setState({
					menuBarUpload:false,
					articleTitle:'',
					newArticle:'',
					imageUrl:'',
					lastArticleQuestion:''
				})
				return response
			})
			.catch((error) => {
				return false;
			});
	},

	delQuestion: async (state) => {
		const title = state.articleTitle;
		const content_type = 'question';
		const originArticle = state.lastArticleQuestion;
		const splitArticle = originArticle.split('"');
		const joinArticle = splitArticle.join(" '");
		const splitEnter = joinArticle.split('\n');
		const joinEnter = splitEnter.join('');
		const banner_photo_url = state.imageUrl;
		const articleDetails = {
			title: title,
			content_type: content_type,
			html_content: joinEnter,
			banner_photo_url: banner_photo_url,
			content_status:2
		};
		console.log('isi req article', articleDetails)
		const req = {
			method: 'put',
			url: state.baseUrl + '/posting/toplevel/' + state.articleId,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: articleDetails
		};
		// data=JSON.stringify(data)
		console.log(articleDetails);
		await axios(req)
			.then((response) => {
				store.setState({
					menuBarUpload:false,
					articleTitle:'',
					newArticle:'',
					imageUrl:'',
					lastArticleQuestion:''
				})
				return response
			})
			.catch((error) => {
				return false;
			});
	},

	updateQuestion: async (state) => {
		const title = state.articleTitle;
		const content_type = 'question';
		const originArticle = state.lastArticleQuestion;
		const splitArticle = originArticle.split('"');
		const joinArticle = splitArticle.join(" '");
		const splitEnter = joinArticle.split('\n');
		const joinEnter = splitEnter.join('');
		const banner_photo_url = state.imageUrl;
		const articleDetails = {
			title: title,
			content_type: content_type,
			html_content: joinEnter,
			banner_photo_url: banner_photo_url,
			content_status:0,
			tags : state.tags
		};
		// articleDetails = JSON.stringify(articleDetails)
		const req = {
			method: 'put',
			url: state.baseUrl + '/posting/toplevel/' + state.articleId,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: articleDetails
		};
		// data=JSON.stringify(data)
		await axios(req)
			.then((response) => {
				store.setState({
					menuBarUpload:false,
					articleTitle:'',
					newArticle:'',
					imageUrl:'',
					lastArticleQuestion:''
				})
				return response
			})
			.catch((error) => {
				return false;
			});
	},

	handleAPI: async (state, parameters) => {
		const getDataRes = await axios(parameters);
		await store.setState({ responseStatus: getDataRes.status});
		if (getDataRes.status === 200) {
			await store.setState({ responseData: getDataRes.data}); 
			await console.log('isi respon data user',store.getState().responseData)
		}
	},
	
	getToken: async (state) => {
		const responseData = await state.responseData;
		console.warn('respon', responseData);
		if (responseData.hasOwnProperty('token')) {
			await localStorage.setItem('token', responseData.token);
			await localStorage.setItem('username', state.username);
		}
	},
	deleteResponse: async (state) => {
		await store.setState({ responseData: null, responseStatus: null });
	},

	afterSignOut : state => {
		localStorage.removeItem("token")
		localStorage.removeItem("username")
		localStorage.removeItem("email")
	},

	postComment : async (state) => {
		const content_type = 'answer'
		const originArticle = state.newArticle
		const splitArticle = originArticle.split('"')
		const joinArticle = splitArticle.join(" '")
		const splitEnter = joinArticle.split("\n")
		const joinEnter = splitEnter.join('')  	  
		const articleDetails = {
			"content_type" : content_type,
			"html_content" : joinEnter
		};
		const req = {
			method: "post",
			url: state.baseUrl + '/posting/secondlevel/' +state.questionId,
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			},
			data: articleDetails
		};
		console.log('isi req', req)
		await axios(req)
			.then(response => {
				console.log('isi respon', response.data)
				store.setState({
					menuBarUpload:false,
					newArticle:''
				})
			})
			.catch(error => {
				return false
		})
	},

	getPopular : async () => {
		const popular = {
			method: 'get',
			url: 'http://13.229.122.5:5000/posting/popular',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const popularContent = await axios(popular)
		await store.setState({ 
			popularArticle : popularContent.data.popular_art,
			popularQuestion : popularContent.data.popular_que,
			popularLoading : false
		})
	}

});
