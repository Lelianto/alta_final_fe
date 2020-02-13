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

class UserProfileAnswer extends Component {
	state = {
		userData: {},
		userDetail: {},
		answers: [],
		userDataLoading : true
	};

	doSearch = () => {
		this.props.history.push('/pencarian');
	};

	componentDidMount = async () => {
		await this.getUserDetail();
		await this.getUserAnswer();
	};

	getUserAnswer = async () => {
		const answer = {
			method: 'get',
			// url: store.getState().baseUrl + '/users/me/answer',
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
        this.setState({ answers: answerRes.data.second_data.second_detail_list });
	};

	getUserDetail = async () => {
		const user = {
			method: 'get',
			// url: store.getState().baseUrl + '/users/me',
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

	render() {
		return (
			<div>
				<Header doSearch={this.doSearch} />
				<UserProfile userData={this.state.userData} userDetail={this.state.userDetail}/>
				<div className="container">
					<div className="row">
						<div className="col-md-3" style={{ paddingTop: '5%' }}>
							<MenuBarProfile />
						</div>
						<div className="col-md-9 user-own-file overflow">
							<h5 className="text-center profile-title">Jawaban</h5>
						{this.state.userDataLoading === true? 
						<div className="pl-5 pr-5">
							<Loader/>
						</div> :
							this.state.answers.map((content) => (
								<UserOwnFile
									typeContent="answer"
									content={content}
								/>
							))
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
