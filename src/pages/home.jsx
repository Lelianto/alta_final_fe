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
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';

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
		popularArticle: [],
		popularQuestion: [],
		interestLoading : true,
		contentLoading : true,
		likeListLoading : true,
		popularLoading : true,
		page : 1,
		infoPage:{},
		likeList : []
	};

	
	componentDidMount = async () => {
		if(localStorage.getItem('token')!== null){
			this.getLikeList()
		}
		await this.getUserTags();
		await this.getPostingList();
		await this.filterPosting();
		await this.props.getPopular();
	};

	getUserTags = async () => {
		const tags = {
			method: 'get',
			url: store.getState().baseUrl+'/users/me',
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
			url: store.getState().baseUrl+'/tags',
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

		await this.setState({ filterInterest: filterInterest, excludeTags: excludeTags, interestLoading : false });
		await store.setState({ filterInterest: filterInterest, excludeTags: excludeTags });
	};

	getPostingList = async () => {
		const parameters = {
			p: this.state.page,
			rp: this.state.contentPage
		};

		const posting = {
			method: 'get',
			url: store.getState().baseUrl+'/posting/toplevel',
			headers: {
				'Content-Type': 'application/json'
			},
			params : parameters
		};
		await axios(posting)
			.then(async (response) => {
				await this.setState({ postingList: response.data.query_data, infoPage:response.data.query_info });
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
		await this.setState({chosenPost : chosenPost, contentLoading : false})
		if(localStorage.getItem('token') === null) {
			this.setState({ likeListLoading : false})
		}
	};

	seeAll = () => {
		const suggestionList = document.getElementById('suggest-list');
		const showOrHide = document.getElementById('seeAll');
		if (suggestionList.style.display === 'none') {
			suggestionList.style.display = 'block';
			showOrHide.style.display = 'none';
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
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delQuestion()
		await this.getPostingList()
		await this.filterPosting()
        await this.props.history.push('/')
	}

	deleteArticle = async (event)=> {
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delArticle()
		await this.getPostingList()
		await this.filterPosting()
        await this.props.history.push('/')
	}

	getProfile = async (id, username) => {
		if(username===localStorage.getItem('username')){
			await this.props.history.push('/profil/pertanyaan')
		} else {
			await store.setState({
				urlProfile : store.getState().baseUrl+'/users/'+id,
				uname : username
			})
			await this.props.history.push('/profil/'+username+'/pertanyaan')
		}
	}
	
	getLikeList = async () => {
		const postId = []
		const like = {
			method: 'get',
			url: store.getState().baseUrl+'/point',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			}
		};
		const likeListRes = await axios(like)
		await likeListRes.data.map(async like => {
			if ((like.deleted === false && like.content_type === 'article') 
			|| (like.deleted === false && like.content_type === 'question')) {
				await postId.push(like.locator_id)
			}
		})
		await this.setState({likeList : postId, likeListLoading : false})
	}

	handleNext = async () => {
		const before = this.state.page+1
		await this.setState({
			page : before,
			contentLoading : true
		})
		await this.getPostingList()
		await this.filterPosting()
	}

	handleBefore = async () => {
		const before = this.state.page-1
		await this.setState({
			page : before,
			contentLoading:true
		})
		await this.getPostingList()
		await this.filterPosting()
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
								<InterestList loading={this.state.interestLoading}
									tags={this.state.filterInterest}
									excludeTags={this.state.excludeTags}
									seeAll={this.seeAll}
									checkAll={() => this.checkAll()}
									chooseTags={this.chooseTags}
								/>
							</div>
							<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow">
							{!this.state.contentLoading && !this.state.likeListLoading ?
								this.state.chosenPost.map((content, i) => (
									<UserOwnFile loading={this.state.contentLoading} deleteArticle={(e)=>this.deleteArticle(e)} deleteQuestion={(e)=>this.deleteQuestion(e)}
										typeContent={content.posting_detail.content_type}
										content={content}
										editArticle={(e) => this.editArticle(e)}
										editQuestion={(e) => this.editQuestion(e)}
										detailArticle={(e) => this.detailArticle(e)}
										goToDetailQuestion={(e) => this.goToDetailQuestion(e)}
										userDetail={this.state.userDetail}
										getProfile={this.getProfile}
										likeList={this.state.likeList}
									/>
								)) :
								<div className='mt-3'> <Skeleton height={400} count={2}/> </div> 
							}
							</div>
							<div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-5 overflow">
								{this.props.popularLoading === true ?
								<div className='mt-3'>
									<Skeleton height={300} count={2}/>
								</div> 
								:
								<PopularList detailArticle={(e)=>this.detailArticle(e)} detailQuestion={(e)=>this.goToDetailQuestion(e)}/>
								}
							</div>
						</div>
					</div>
					<div className='container'>
						<div className='row'>
							<div className='col-md-5'>
							</div>
							<div className='col-md-2'>
								<ul class="pagination pagination-lg" style={{fontSize:'30px', marginBottom:'-30px', marginTop:'20px'}}>
									{this.state.page===1?
									<Link className='box-pagination-empty'>&laquo;</Link>
									:
									<Link onClick={()=>this.handleBefore()} className='box-pagination-left'>&laquo;</Link>
									}
									<Link className='box-pagination-number'>{this.state.page}</Link>
									{this.state.infoPage.total_pages === this.state.page?
									<Link className='box-pagination-empty'>&raquo;</Link>
									:
									<Link onClick={()=>this.handleNext()} className='box-pagination-right'>&raquo;</Link>
									}
								</ul>
							</div>
							<div className='col-md-5'>
							</div>
						</div>
					</div>
					<Footer />
				</React.Fragment>
			);
		}
	}
}
export default connect('responseData, popularLoading', actions)(withRouter(Home));
