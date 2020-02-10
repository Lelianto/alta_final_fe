import React, { Component } from 'react';
import '../styles/css/menubar.css';
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import axios from 'axios';
import { actions, store } from '../stores/store';

class UserProfileArticle extends Component {
	state = {
		userData: {},
		userDetail: {},
		articles: []
	};

	doSearch = () => {
		this.props.history.push('/pencarian');
	};

	componentDidMount = async () => {
		await this.getUserDetail();
		await this.getUserArticle();
	};

	getUserArticle = async () => {
		const article = {
			method: 'get',
			url: store.getState().baseUrl + '/users/me/article',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			validateStatus: (status) => {
				return status < 500;
			}
		};

		const articleRes = await axios(article);
		this.setState({ articles: articleRes.data.query_data });
	};

	getUserDetail = async () => {
		const user = {
			method: 'get',
			url: store.getState().baseUrl + '/users/me',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			validateStatus: (status) => {
				return status < 500;
			}
		};

		const userRes = await axios(user);
		this.setState({ userData: userRes.data.user_data, userDetail: userRes.data.user_detail_data });
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

	render() {
		return (
			<div>
				<Header doSearch={this.doSearch} />
				<UserProfile userData={this.state.userData} userDetail={this.state.userDetail} />
				<div className="container">
					<div className="row">
						<div className="col-md-3" style={{ paddingTop: '5%' }}>
							<MenuBarProfile />
						</div>
						<div className="col-md-9 user-own-file">
							<h5 className="text-center profile-title">Artikel</h5>
							{this.state.articles.map((content) => (
								<UserOwnFile
									typeContent="article"
									content={content}
									userDetail={this.state.userData}
                                    userData={this.state.userData}
                                    editArticle={(e)=>this.editArticle(e)}
									detailArticle={(e) => this.detailArticle(e)}
								/>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default UserProfileArticle;
