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
import axios from 'axios';
import Loader from '../components/loader';
import Loader2 from '../components/loader2';

const listContent = [ 'Artikel' ];

class ArticlePage extends React.Component {
	state = {
		userInterest: [],
		interestList : [],
		filterInterest : [],
		excludeTags : [],
		postingList : [],
		chosenTags: [],
		chosenPost: [],
		userDetail : {},
		popularLoading : true,
		contentLoading : true,
		interestLoading : true
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

	componentDidMount = async () => {
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
				'Authorization':'Bearer ' + localStorage.getItem("token")
			},
			validateStatus : (status) => {
                return status < 500
            }
		};
		
        await axios(tags)
			.then(async (response) => {
				await this.setState({userInterest : response.data.user_tag_data, userDetail : response.data.user_data})
				await store.setState({userInterest : response.data.user_tag_data})
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
			await store.setState({interestList : response.data})
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
		await store.setState({filterInterest : filterInterest, excludeTags : excludeTags})
	}

	getPostingList = async () => {
		const parameter = {
			content_type : 'article',
			keyword : this.props.keyword
		}

		const posting = {
			method: 'get',
			url: store.getState().baseUrl +'/posting/toplevel',
			headers: {
				'Content-Type': 'application/json'
			},
			params : parameter
		};
		await axios(posting)
		.then(async (response) => {
			await this.setState({postingList : response.data.query_data})
		})
		.catch(async (error) => {
			await console.warn(error)
		})
	}

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
	
	editArticle = async (event)=> {
        await store.setState({
            userId:event
		})
        await this.props.history.push('/artikel/'+event +'/edit')
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
        await this.props.history.push('/artikel')
	}

	goToDetailQuestion = async (event) => {
		store.setState({
			userId: event
		});
		await this.props.history.push('/pertanyaan/' + event);
	};
	
	doSearch = () => {
		this.props.history.push('/pencarian/artikel')
	}

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

	getProfile = async (id, username) => {
		await store.setState({
			urlProfile : 'https://kodekula.herokuapp.com/users/'+id,
			uname : username
		})
		await this.props.history.push('/profil/'+username+'/pertanyaan')
	}

	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch} />
				<div className="container-fluid pt-4">
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-2 col-md-2 col-sm-12 col-12 mt-5 overflow">
							<Link style={{textDecoration:'none', color:'white'}} to='/artikel/tulis'>
								<button to='/artikel/tulis' className='btn btn-success button-write-article-control mt-4'>Tulis Artikel</button>
							</Link>
							{this.state.interestLoading === true ?
							<div className='pl-5 pr-5'>
								<Loader/>
							</div>
						:	
							<InterestList tags={this.state.filterInterest} excludeTags={this.state.excludeTags} seeAll={this.seeAll} checkAll={()=>this.checkAll()}
							chooseTags={this.chooseTags}/>
						}
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow">
							{this.state.contentLoading === true? 
							<div className="pr-5 pl-5">
								<Loader/>
							</div>
							:
								this.state.chosenPost.map((content, i) => <UserOwnFile  deleteArticle={(e)=>this.deleteArticle(e)} typeContent={content.posting_detail.content_type} content={content} editArticle={(e)=>this.editArticle(e)} detailArticle={(e)=>this.detailArticle(e)} userDetail={this.state.userDetail} getProfile={this.getProfile}/>)
							}
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-5 overflow">
							{this.props.popularLoading === true ?
								<div className='pl-5 pr-5'>
									<Loader/>
								</div> 
								:
								<PopularList detailArticle={(e)=>this.detailArticle(e)} detailQuestion={(e)=>this.goToDetailQuestion(e)}/>
								}
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect('keyword, popularLoading', actions)(withRouter(ArticlePage));
