import React from 'react';
import '../styles/css/articlePage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import InterestList from '../components/interestList';
import PopularList from '../components/popularList';
import UserOwnFile from '../components/userOwnFile';
import { Helmet } from 'react-helmet'
import axios from 'axios';
import Butter from 'buttercms'
import Loader from '../components/loader';
import Skeleton from 'react-loading-skeleton'

const butter = Butter('31d63e3ae80e878f31b54be79123e3052be26bd4');

class QuestionPage extends React.Component {
	state = {
		userInterest: [],
		interestList : [],
		filterInterest : [],
		excludeTags : [],
		postingList : [],
		userDetail : {},
		chosenTags: [],
		loaded:false,
		resp:null,
		post:null,
		chosenPost: [],
		contentLoading : true,
		likeListLoading : true,
		interestLoading : true,
		likeList : [],
		page : 1,
		infoPage:{}
	};

	componentDidMount = async () => {
		if(localStorage.getItem('token')!==null){
			await this.getLikeList()
		}
		await this.getUserTags()
		await this.getPostingList()
		await this.filterPosting();
		const resp = await butter.page.retrieve('*', 'beranda')
		this.setState(resp.data)
		await this.props.getPopular();
	};

	getUserTags = async () => {
		const tags = {
			method: 'get',
			url: store.getState().baseUrl+'/users/me',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + localStorage.getItem("token")
			},
			validateStatus : (status) => {
                return status < 500
            }
		};
		
        await axios(tags)
			.then(async (response) => {
				await this.setState({userInterest : response.data.user_tag_data, userDetail : response.data.user_data})
			})
			.catch(async (error) => {
				await console.warn(error)
			})

		await this.setState({chosenTags : this.state.userInterest.slice()})
		await this.getAllTags()
	}
	
	getAllTags = async () => {
		const tags = {
			method: 'get',
			url: store.getState().baseUrl + '/tags',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		await axios(tags)
		.then(async (response) => {
			await this.setState({interestList : response.data})
		})
		.catch(async (error) => {
			await console.warn(error)
		})
		
		await this.filterTags()
		
	}
	
	filterTags = async () => {
		const interestList = this.state.interestList
		const userInterest = this.state.userInterest
		let filterInterest = []
		let excludeTags = []
		let i
		for (i=0; i<interestList.length; i++) {
			if (userInterest.includes(interestList[i].name)) {
				filterInterest.push(interestList[i])
			} else {
				excludeTags.push(interestList[i])
			}
		}

		await this.setState({filterInterest : filterInterest, excludeTags : excludeTags, interestLoading : false})
	}

	getPostingList = async () => {
		const parameter = {
			content_type : 'question',
			p: this.state.page,
			rp: this.state.contentPage
		}
		const posting = {
			method: 'get',
			url: store.getState().baseUrl+'/posting/toplevel',
			headers: {
				'Content-Type': 'application/json'
			},
			params : parameter
		};
		await axios(posting)
		.then(async (response) => {
			await this.setState({postingList : response.data.query_data, infoPage:response.data.query_info})
		})
		.catch(async (error) => {
			await console.warn(error)
		})
	}

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
			await this.setState({ likeListLoading : false})
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

	detailArticle = async (event)=> {
        await store.setState({
            userId:event
		})
        await this.props.history.push('/artikel/'+event)
	}

	goToDetailQuestion = async (event)=> {
        store.setState({
            userId:event
		})
        await this.props.history.push('/pertanyaan/'+event)
	}
	
	editQuestion = async (event)=> {
        await store.setState({
            userId:event
		})
        await this.props.history.push('/pertanyaan/'+event +'/edit')
	}

	doSearch = () => {
		this.props.history.push('/pencarian/pertanyaan')
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
        await this.props.history.push('/pertanyaan')
	}

	getProfile = async (id, username) => {
		await store.setState({
			urlProfile : store.getState().baseUrl+'/users/'+id,
			uname : username
		})
		await this.props.history.push('/profil/'+username+'/pertanyaan')
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
			if (like.content_type === 'question' && like.deleted === false) {
				await postId.push(like.locator_id)
			}
		})
		await this.setState({likeList : postId, likeListLoading : false})
	}
	handleNext = async () => {
		const before = this.state.page+1
		this.setState({
			page : before,
			contentLoading : true
		})
		await this.getPostingList()
		await this.filterPosting()
	}

	handleBefore = async () => {
		const before = this.state.page-1
		this.setState({
			page : before,
			contentLoading:true
		})
		await this.getPostingList()
		await this.filterPosting()
	}
	
	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch} />
					<Helmet>
						<title>Pertanyaan Kodekula</title>
						<meta name="description" content="Bertanya bukan berarti tidak akan mengerti, hanya saja belum dilalui" />
						<meta name="og:title" content="Selalu temukan cara untuk berdiskusi tentang pemrograman" />
						<meta name="og:description" content="Bertanya adalah cara paling efektif untuk menyelesaikan masalah, terutama dalam pemrograman." />
					</Helmet>
				<div className="container-fluid pt-4">
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-2 col-md-2 col-sm-12 col-12 mt-5 overflow">
							{localStorage.getItem('token')!==null || localStorage.getItem('username')!==null?
								<Link style={{textDecoration:'none', color:'white'}} to='/pertanyaan/tulis'>
									<button to='/artikel/tulis' className='btn btn-success button-write-article-control mt-4'>Tulis Pertanyaan</button>
								</Link>
							:
								<span></span>
							}
							<InterestList tags={this.state.filterInterest} excludeTags={this.state.excludeTags} seeAll={this.seeAll} checkAll={()=>this.checkAll()
							}
							chooseTags={this.chooseTags}/>
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow">
							{!this.state.contentLoading && !this.state.likeListLoading? 
								this.state.chosenPost.map((content, i) => 
								<UserOwnFile 
								editQuestion={(e)=>this.editQuestion(e)} 
								goToDetailQuestion={(event) =>this.goToDetailQuestion(event)} deleteQuestion={(e)=>this.deleteQuestion(e)} 
								typeContent={content.posting_detail.content_type} 
								content={content} userDetail={this.state.userDetail} 
								getProfile={this.getProfile}
								likeList={this.state.likeList}/>)
								:
							<div className='mt-3'>
								<Skeleton height={400} count={15}/>
							</div> 
							}
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-5 overflow" >
							{this.props.popularLoading === true ?
							<div className='mt-3'>
								<Skeleton height={400} count={2}/>
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
export default connect('popularLoading', actions)(withRouter(QuestionPage));
