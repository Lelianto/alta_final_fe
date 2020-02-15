import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import InterestList from '../components/interestList';
import PopularList from '../components/popularList';
import UserOwnFile from '../components/userOwnFile';
import Loader from '../components/loader';
import axios from 'axios';


class Search extends React.Component {
	state = {
		userInterest: [],
		interestList: [],
		filterInterest: [],
		excludeTags: [],
		postingList: [],
		userDetail : {},
		likeList : [],
		likeListLoading : true,
		interestLoading : true,
		contentLoading : true
	};

	componentDidMount = async () => {
		if(localStorage.getItem('token')!==null){
			this.getLikeList()
		}
		this.getUserTags();
		this.getPostingList();
		this.props.getPopular();
	};

	getUserTags = async () => {
		const tags = {
			method: 'get',
			url: store.getState().baseUrl+ '/users/me',
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
				await this.setState({ userInterest: response.data.user_tag_data, userDetail : response.data.user_data });
			})
			.catch(async (error) => {
				await console.warn(error);
			});

		await this.getAllTags();
	};

	getAllTags = async () => {
		const tags = {
			method: 'get',
			url: store.getState().baseUrl+ '/tags',
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
	};

	getPostingList = async () => {
		const parameters = {
            keyword : this.props.keyword,
            content_type : this.props.locationPage
		};

		const posting = {
			method: 'get',
			url: store.getState().baseUrl+ '/posting/toplevel',
			headers: {
				'Content-Type': 'application/json'
			},
			params: parameters
		};
		await axios(posting)
			.then(async (response) => {
				await this.setState({ postingList: response.data.query_data, contentLoading : false });
			})
			.catch(async (error) => {
			});
		if (localStorage.getItem('token')===null){
			this.setState({likeListLoading : false})
		}
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

	checkAll = () => {
		const checkState = document.getElementById('all');
		const userInterest = this.state.userInterest;
		if (checkState.checked === true) {
			userInterest.map((item) => {
				const changeCheckedStatus = document.getElementById(item);
				changeCheckedStatus.checked = true;
			});
		} else {
			userInterest.map((item) => {
				const changeCheckedStatus = document.getElementById(item);
				changeCheckedStatus.checked = false;
			});
		}
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
			if ((like.deleted === false && like.content_type === 'article') 
			|| (like.deleted === false && like.content_type === 'question')) {
				await postId.push(like.locator_id)
			}
		})
		await this.setState({likeList : postId, likeListLoading : false})
	}

	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.getPostingList} />
				<div className="container-fluid pt-4">
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-2 col-md-2 col-sm-12 col-12 mt-5 overflow">
							{this.state.interestLoading === true ?
							<div className="pl-5 pr-5"><Loader/></div>
							:
							<InterestList
								tags={this.state.filterInterest}
								excludeTags={this.state.excludeTags}
								seeAll={this.seeAll}
								checkAll={() => this.checkAll()}
							/>
							}
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow">
							{this.state.likeListLoading === true && this.state.contentLoading === true ? 
							<div className="pl-5 pr-5"><Loader/></div>	
							:
							this.state.postingList.map((content, i) => (
								<UserOwnFile
									typeContent={content.posting_detail.content_type}
									content={content}
									detailArticle={(e) => this.detailArticle(e)}
									goToDetailQuestion={(e) => this.goToDetailQuestion(e)}
									userDetail={this.state.userDetail}
									likeList={this.state.likeList}
									getProfile={this.getProfile}
								/>
							))
						}
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
export default connect('responseData, keyword, locationPage', actions)(withRouter(Search));
