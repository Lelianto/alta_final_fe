import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import InterestList from '../components/interestList';
import PopularList from '../components/popularList';
import UserOwnFile from '../components/userOwnFile';
import axios from 'axios';
import Butter from 'buttercms'
import { Helmet } from 'react-helmet';
import Loader from '../components/loader';

const butter = Butter('31d63e3ae80e878f31b54be79123e3052be26bd4');
class Home extends React.Component {
	state = {
		userInterest: [],
		interestList: [],
		filterInterest: [],
		excludeTags: [],
		postingList: [],
		userDetail: {},
		chosenTags: [],
		chosenPost: [],
		article: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit',
			'Alias corrupti velit illum sequi quas omnis esse ipsam sed aut delectus blanditiis',
			'Deserunt dolor temporibus enim deleniti a!',
			'Pariatur exercitationem atque non excepturi, cum',
			'reiciendis mollitia error maxime earum totam, placeat quod! Ipsa, eum'
		]
	};
	
	componentDidMount = async () => {
		const { match } = this.props
		const resp = await butter.page.retrieve('*', 'beranda')
		this.setState(resp.data)
		console.log('new item',resp.data)
	}

	componentWillMount = async () => {
		await this.getUserTags();
		await this.getPostingList();
		await this.filterPosting();
		console.log(this.props.match)
		let page = 1
		if(this.props.match.params.page !== null){
			console.log('ada')
			page = this.props.match.params.page || 1
			this.fetchPosts(page)
		} else {
			console.log('tidak ada')
			this.fetchPosts(page)
		}
	};

	fetchPosts =(page) => {
		butter.post.list({page: page, page_size: 10}).then((resp) => {
		  this.setState({
			loaded: true,
			resp: resp.data
		  })
		  console.log('isi respon fetching', this.state.resp)
		});
	  }

	componentWillReceiveProps(nextProps) {
		this.setState({loaded: false});
		let page = 1
		if(nextProps.match.params.page !== null){
			let page = nextProps.match.params.page || 1
			this.fetchPosts(page)
		} else {
			this.fetchPosts(page)
		}
	}

	getUserTags = async () => {
		const tags = {
			method: 'get',
			url: 'https://api.kodekula.com/users/me',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			validateStatus: (status) => {
				return status < 500;
			}
		};

		await axios(tags)
			.then(async (response) => {
				await this.setState({
					userInterest: response.data.user_tag_data,
					userDetail: response.data.user_data
				});
			})
			.catch(async (error) => {
				await console.warn(error);
			});

		await this.setState({chosenTags : this.state.userInterest.slice()})
		await this.getAllTags();
	};

	getAllTags = async () => {
		const tags = {
			method: 'get',
			url: 'https://api.kodekula.com/tags',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		await axios(tags)
			.then(async (response) => {
				await this.setState({ interestList: response.data });
				await store.setState({ interestList: response.data });
			})
			.catch(async (error) => {
				await console.warn(error);
			});

		await this.filterTags();
	};

	filterTags = async () => {
		const interestList = this.state.interestList;
		const userInterest = this.state.userInterest;
		let filterInterest = [];
		let excludeTags = [];
		let i;
		for (i = 0; i < interestList.length; i++) {
			if (userInterest.includes(interestList[i].name)) {
				filterInterest.push(interestList[i]);
			} else {
				excludeTags.push(interestList[i]);
			}
		}

		await this.setState({ filterInterest: filterInterest, excludeTags: excludeTags });
		await store.setState({ filterInterest: filterInterest, excludeTags: excludeTags });
	};

	getPostingList = async () => {
		const parameters = {
			keyword: this.props.keyword
		};

		const posting = {
			method: 'get',
			url: 'https://api.kodekula.com/posting/toplevel',
			headers: {
				'Content-Type': 'application/json'
			},
			params: parameters
		};
		await axios(posting)
			.then(async (response) => {
				await this.setState({ postingList: response.data.query_data });
			})
			.catch(async (error) => {
				await console.warn(error);
			});
	};

	filterPosting = async () => {
		let chosenTags = []
		if (this.state.chosenTags.length > 0) {
			chosenTags = this.state.chosenTags
		} else {
			if (this.state.userInterest.length === 0) {
				this.state.excludeTags.map((tag)=>{
					chosenTags.push(tag.name)
				})
			} else {
				chosenTags = this.state.userInterest
			}
		}

		const postingList = await this.state.postingList;
		const chosenPost = []
		postingList.map((post) => {
			post.posting_detail.tags.map((tag) => {
				if (chosenTags.includes(tag)) {
					if (chosenPost.includes(post) === false) {
						chosenPost.push(post);
					}
				}
			});
		});
		await this.setState({chosenPost : chosenPost})
	};

	seeAll = () => {
		const suggestionList = document.getElementById('suggest-list');
		const showOrHide = document.getElementById('seeAll');
		if (suggestionList.style.display === 'none') {
			suggestionList.style.display = 'block';
			showOrHide.innerHTML = 'Sembunyikan...';
		} else {
			suggestionList.style.display = 'none';
			showOrHide.innerHTML = 'Lihat Semua...';
		}
	};

	checkAll = async () => {
		const checkState = document.getElementById('all');
		const userInterest = this.state.userInterest;
		let chosenTags = this.state.chosenTags
		if (checkState.checked === true) {
			userInterest.map((item) => {
				const changeCheckedStatus = document.getElementById(item);
				changeCheckedStatus.checked = true;
				if (chosenTags.includes(item) === false) {
					chosenTags.push(item)
				}
			});
			await this.setState({chosenTags : chosenTags})
		} else {
			userInterest.map(async (item) => {
				const changeCheckedStatus = document.getElementById(item);
				changeCheckedStatus.checked = false;
			});
			const newTags = chosenTags.filter(tag => !userInterest.includes(tag))
			await this.setState({chosenTags : newTags})
		}
		
		await this.filterPosting()
	};

	detailArticle = async (event) => {
		await store.setState({
			userId: event
		});
		await this.props.history.push('/artikel/' + event);
	};

	goToDetailQuestion = async (event) => {
		store.setState({
			userId: event
		});
		await this.props.history.push('/pertanyaan/' + event);
	};

	doSearch = () => {
		this.props.history.push('/pencarian');
	};

	detailArticle = async (event) => {
		await store.setState({
			userId: event
		});
		await this.props.history.push('/artikel/' + event);
	};

	editArticle = async (event) => {
		await store.setState({
			userId: event
		});
		await this.props.history.push('/artikel/' + event + '/edit');
	};

	editQuestion = async (event) => {
		await store.setState({
			userId: event
		});
		await this.props.history.push('/pertanyaan/' + event + '/edit');
	};

	chooseTags = async (event) => {
		const checkState = document.getElementById('all');
		if (event.target.name === 'suggest' || checkState.checked === false) {
			let chosenTags = this.state.chosenTags
			if (event.target.checked === true) {
				if(chosenTags.includes(event.target.value)===false){
					chosenTags.push(event.target.value)
				}
			} else {
				if(chosenTags.includes(event.target.value)===true) {
					let newTags = chosenTags.filter(item => item !== event.target.value)
					chosenTags = newTags
				}
			}
			await this.setState({chosenTags : chosenTags})
			await this.filterPosting()
		}
	}
	
	deleteQuestion = async (event)=> {
		console.log('isi event',event)
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delQuestion()
		await console.log('DELETED')
		await this.componentWillMount()
        await this.props.history.push('/')
	}

	deleteArticle = async (event)=> {
		console.log('isi event',event)
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delArticle()
		await console.log('DELETED')
		await this.componentWillMount()
        await this.props.history.push('/')
	}

	render() {
		if(localStorage.getItem('username')==='admin'){
			this.props.history.push('/admin/pengguna')
			return (
				<div></div>
			)
		} else {
			return (
				<React.Fragment>
					<Header doSearch={this.doSearch} />
					<Helmet>
						<title>Kodekula</title>
						<meta name="description" content="datanglah setiap kamu bingung dengan pemrograman dan temukan di sini" />
						<meta name="og:title" content="Selalu temukan cara paling efektif dalam pemrograman" />
						<meta name="og:description" content="Perlu jam terbang yang tinggi untuk dapat menguasai pemrograman. Pemrograman adalah untuk orang yang kreatif, taktis, dan tentunya tidak mudah menyerah." />
					</Helmet>
					<div className="container-fluid pt-4">
						<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
							<div className="col-lg-2 col-md-2 col-sm-12 col-12 mt-5 overflow">
								<InterestList
									tags={this.state.filterInterest}
									excludeTags={this.state.excludeTags}
									seeAll={this.seeAll}
									checkAll={() => this.checkAll()}
									chooseTags={this.chooseTags}
								/>
							</div>
							<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow">
								{this.state.chosenPost.map((content, i) => (
									<UserOwnFile deleteArticle={(e)=>this.deleteArticle(e)} deleteQuestion={(e)=>this.deleteQuestion(e)}
										typeContent={content.posting_detail.content_type}
										content={content}
										editArticle={(e) => this.editArticle(e)}
										editQuestion={(e) => this.editQuestion(e)}
										detailArticle={(e) => this.detailArticle(e)}
										goToDetailQuestion={(e) => this.goToDetailQuestion(e)}
										userDetail={this.state.userDetail}
									/>
								))}
							</div>
							<div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-5 overflow">
								<PopularList article={this.state.article} />
							</div>
						</div>
					</div>
					<Footer />
				</React.Fragment>
			);
		}
	}
}
export default connect('responseData, keyword', actions)(withRouter(Home));
