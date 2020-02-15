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
	menuBarSetting:'Data Diri',
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
	statusGoogle: true,
	notification : [],
	notifLoading : true
}

export const store = createStore(initialState);

export const actions = (store) => ({
	changeInput: async (state, e) => {
		const title = await e.target.value
		await store.setState({ articleTitle: title });
	},

	/**
	 * @function showPassword()
	 * @param { String } id
	 * @param { String } idImage
	 * Result : imgPassword.innerHTML
	 * Result : password.type
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
	
	/**
	 * @function setInput()
	 * @param { String, Integer, or Boolean } event
	 * For changing value of some variable (name)
	 */
	setInput : (state, event) => {
		store.setState({[event.target.name] : event.target.value})	
	},

	/**
	 * @function addNewTag() Add new tag
	 * @returns { String } New Tag
	 */
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

	/**
	 * @function compileCode() Add new tag
	 * @returns { String, Integer, or Boolean } Compile result
	 */
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

	/**
	 * @function setGlobal()
	 * @param { String, Integer, or Boolean } event
	 * For changing value of some variable (name)
	 */
	setGlobal: async (state, event) => {
		await store.setState({ [event.target.name]: event.target.value });
	},

	/**
	 * @function delUser() soft deleting user by id
	 * @returns { Boolean } change deleted status be 'True'
	 */
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

	/**
	 * @function delComment() soft deleting comment in detail article page by id
	 * @returns { Boolean } change deleted status be 'True'
	 */
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

	/**
	 * @function uploadArticle() upload article to database
	 * @returns Success or fail uploading 
	 */
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

	/**
	 * @function uploadQuestion() upload question to database
	 * @returns Success or fail uploading
	 */
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

	/**
	 * @function updateArticle() update article in database
	 * @returns Success or fail updating
	 */
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
		const req = {
			method: 'put',
			url: state.baseUrl + '/posting/toplevel/' + state.articleId,
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
					imageUrl:'',
					lastArticleQuestion:''
				})
				return response
			})
			.catch((error) => {
				return false;
			});
	},

	/**
	 * @function delArticle() soft deleting article in database
	 * @returns Success or fail deleting
	 */
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

	/**
	 * @function delQuestion() soft deleting question in database
	 * @returns Success or fail deleting
	 */
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

	/**
	 * @function updateQuestion() updating question in database
	 * @returns Success or fail updating
	 */
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
		const req = {
			method: 'put',
			url: state.baseUrl + '/posting/toplevel/' + state.articleId,
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
					imageUrl:'',
					lastArticleQuestion:''
				})
				return response
			})
			.catch((error) => {
				return false;
			});
	},

	/**
	 * @function handleAPI() handle API processing
	 * @returns Success or fail response
	 */
	handleAPI: async (state, parameters) => {
		const getDataRes = await axios(parameters);
		await store.setState({ responseStatus: getDataRes.status});
		if (getDataRes.status === 200) {
			await store.setState({ responseData: getDataRes.data}); 
		}
	},
	
	/**
	 * @function getToken() get token for login and save it in localstorage
	 * @returns Success or fail login
	 */
	getToken: async (state) => {
		const responseData = await state.responseData;
		if (responseData.hasOwnProperty('token')) {
			await localStorage.setItem('token', responseData.token);
			await localStorage.setItem('username', state.username);
		}
	},

	/**
	 * @function deleteResponse() deleting response data from global state
	 * @returns Success or fail deleting
	 */
	deleteResponse: async (state) => {
		await store.setState({ responseData: null, responseStatus: null });
	},

	/**
	 * @function afterSignOut() deleting all local storage data
	 * @returns Success or fail deleting
	 */
	afterSignOut : state => {
		localStorage.removeItem("token")
		localStorage.removeItem("username")
		localStorage.removeItem("email")
	},

	/**
	 * @function postComment() add new comment to an article
	 * @returns Success or fail uploading
	 */
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
		await axios(req)
			.then(response => {
				store.setState({
					menuBarUpload:false,
					newArticle:''
				})
			})
			.catch(error => {
				return false
		})
	},

	/**
	 * @function getPopular() get all popular article and question
	 * @returns Success or fail getting datas
	 */
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

	/**
	 * @function handleLogOutGoogle() log out when using google account
	 * @returns Success or fail logout
	 */
	handleLogOutGoogle : async (state) => {
		localStorage.setItem('loginGoogle', true)
		await window.location.replace('http://localhost:3000/')
	},

	likePosting : async (state, id, content_type) => {
		if(localStorage.getItem('token')!==null){
			const image = document.getElementById(id)
			const point = document.getElementById('point'+id)
			const pointNumb = point.innerHTML
			let value;
			if (image.className === 'material-icons') {
				image.className = 'material-icons-outlined'
				point.innerHTML = pointNumb*1-1
				value = 0
			} else {
				value = 1
				image.className = 'material-icons'
				point.innerHTML = pointNumb*1+1
			}
			const like = {
				locator_id : id,
				content_type : content_type,
				value : value
			}
			const requestLike = {
				method: "put",
				url: state.baseUrl + '/point',
				headers: {
					'Content-Type': 'application/json',
					Authorization: "Bearer " + localStorage.getItem('token')
				},
				data: like,
				validateStatus: (status) => {
					return status < 500;
				}
			};
			const likeRes = await axios(requestLike)
		}
	}
});
