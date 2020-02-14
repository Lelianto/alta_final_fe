import createStore from 'unistore';
import axios from 'axios';
import like from '../images/like.png';
import havelike from '../images/have-like.png';

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
	baseUrl:'https://api.kodekula.com',
	// baseUrl:'http://13.229.122.5:5000',
	// baseUrl: 'https://kodekula.herokuapp.com',
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
	allUser:[],
	allTag:[],
	allQuestion:[],
	allAnswer:[],
	allArticle:[],
	menu:'',
	allData:[],
	urlProfile : 'https://api.kodekula.com/users/me',
	uname : '',
	popularArticle : [],
	popularQuestion : [],
	popularLoading : true,
	newTag : '',
	newLogo : '',
	putTag :[],
	idUser : '',
	htmlContent:'',
	idComment:'',
	statusGoogle: true
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
		console.log('newTag', store.getState().newTag)
		console.log('newLogo', store.getState().newLogo)	
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

	addNewTag : async (state) => {
		const tagName = state.newTag
		const tagUrl = state.newLogo
		const newTagging = {
			name: tagName,
			photo_url: tagUrl,
		};
		const req = {
			method: 'post',
			url: state.baseUrl + '/tags',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: newTagging
		};
		await axios(req)
			.then((response) => {
				store.setState({
					newTag:'',
					newLogo:''
				})
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
	},

	delUser: async (state) => {
		const idUser = state.idUser;
		const deleteData = {
			deleted:true
		}
		const req = {
			method: 'put',
			url: state.baseUrl + '/users/' + idUser,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: deleteData
		};
		// data=JSON.stringify(data)
		await axios(req)
			.then((response) => {
				store.setState({
					idUser:''
				})
				return response
			})
			.catch((error) => {
				console.log(error)
				return false;
			});
	},

	delComment: async (state) => {
		const idComment = state.idComment;
		const htmlContent = state.htmlContent
		const deleteData = {
			html_content : htmlContent,
			content_status:2
		}
		const req = {
			method: 'put',
			url: state.baseUrl + '/posting/secondlevel/' + idComment,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: deleteData
		};
		// data=JSON.stringify(data)
		await axios(req)
			.then((response) => {
				store.setState({
					idUser:''
				})
				return response
			})
			.catch((error) => {
				return false;
			});
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

	delArticle: async (state) => {
		const title = state.articleTitle;
		const content_type = 'article';
		const originArticle = state.lastArticleQuestion;
		const splitArticle = originArticle.split('"');
		const joinArticle = splitArticle.join(" '");
		const splitEnter = joinArticle.split('\n');
		const joinEnter = splitEnter.join('');
		const banner_photo_url = state.imageUrl;
		const tags = state.putTag
		const articleDetails = {
			title: title,
			content_type: content_type,
			html_content: joinEnter,
			banner_photo_url: banner_photo_url,
			tags : tags,
			content_status:2
		};
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
				console.log('terhapus')
				return response
			})
			.catch((error) => {
				console.log(error)
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
		const tags = state.putTag
		const articleDetails = {
			title: title,
			content_type: content_type,
			html_content: joinEnter,
			banner_photo_url: banner_photo_url,
			content_status:2,
			tags:tags
		};
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
		console.log(req)
		await axios(req)
			.then(response => {
				store.setState({
					menuBarUpload:false,
					newArticle:''
				})
			console.log('isi response', response)
			})
			.catch(error => {
				return false
		})
	},

	getPopular : async (state) => {
		const popular = {
			method: 'get',
			url: state.baseUrl+'/posting/popular',
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
	},

	handleLogOutGoogle : async (state) => {
		localStorage.setItem('loginGoogle', true)
		await window.location.replace('http://localhost:3000/')
	}

	// likePosting : async (state, id, content_type) => {
	// 	const image = document.getElementById('img-like')
	// 	let value;
	// 	if (image.title === 'like') {
	// 		console.warn('like')
	// 		value = 0
	// 		image.src = like
	// 	} else {
	// 		value = 1
	// 		image.src = havelike
	// 	}
	// 	const like = {
	// 		locator_id : id,
	// 		content_type : content_type,
	// 		value : value
	// 	}
	// 	const requestLike = {
	// 		method: "put",
	// 		url: state.baseUrl + '/point',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: "Bearer " + localStorage.getItem('token')
	// 		},
	// 		data: like,
	// 		validateStatus: (status) => {
	// 			return status < 600;
	// 		}
	// 	};
	// 	const likeRes = await axios(requestLike)
	// 	console.warn('respon', likeRes)
	// }

});
