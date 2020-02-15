import React, { Component } from 'react';
import '../styles/css/menubar.css';
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import axios from 'axios';
import { actions, store } from '../stores/store';
import Loader from '../components/loader'
import Skeleton from 'react-loading-skeleton'

class UserProfileAnswer extends Component {
	state = {
		userData: {},
		userDetail: {},
		answers: [],
		slLikeList : [],
		userDataLoading : true,
		likeListLoading : true,
		contentLoading : true
	};

	doSearch = () => {
		this.props.history.push('/pencarian');
	};

	componentDidMount = async () => {
		await this.getUserDetail();
		await this.getUserAnswer();
		if(localStorage.getItem('token')!==null){
			this.getLikeList()
		} else {
			this.setState({likeListLoading : false})
		}
	};

	getUserAnswer = async () => {
		const answer = {
			method: 'get',
			url: store.getState().urlProfile+'/answer',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			validateStatus: (status) => {
				return status < 500;
			}
		};

		const answerRes = await axios(answer);
        this.setState({ answers: answerRes.data.second_data.second_detail_list, contentLoading : false });
	};

	getUserDetail = async () => {
		const user = {
			method: 'get',
			url: store.getState().urlProfile,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			validateStatus: (status) => {
				return status < 500;
			}
		};

		const userRes = await axios(user);
		this.setState({ userData: userRes.data.user_data, userDetail: userRes.data.user_detail_data, userDataLoading : false });
	};

	getLikeList = async () => {
		const slId = []
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
			if (like.content_type === 'answer' && like.deleted === false) {
                await slId.push(like.locator_id)
            }
		})
		await this.setState({slLikeList : slId, likeListLoading : false})
	}

	render() {
		return (
			<div>
				<Header doSearch={this.doSearch} />
				{this.state.userDataLoading === true || this.state.userDetail === {} ||  this.state.userDetail === undefined ?
          <div className='pt-4 container-fluid'>
            <div className='row'>
              <div className="col-md-4 pt-5">
                <Skeleton circle={true} height={250} width={250} />
              </div>
              <div className="col-md-5 pt-5 mt-5">
                <Skeleton className='mb-4' height={50} count={3}/>
              </div>
            </div>
        </div>
        :
            <UserProfile userData={this.state.userData} userDetail={this.state.userDetail}/>
          }
				<div className="container">
					<div className="row">
						<div className="col-md-3" style={{ paddingTop: '5%' }}>
							<MenuBarProfile />
						</div>
						<div className="col-md-9 user-own-file overflow">
							<h5 className="text-center profile-title">Jawaban</h5>
						{!this.state.likeListLoading && !this.state.contentLoading? 
						this.state.answers.map((content) => (
							<UserOwnFile
								typeContent="answer"
								content={content}
								likeList={this.state.slLikeList}
							/>
						)) 
						:
						<div className='mt-4'>
							<Skeleton height={400} count={2}/>
						</div>
						}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default UserProfileAnswer;
