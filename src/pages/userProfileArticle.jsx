import React, { Component } from 'react';
import '../styles/css/menubar.css';
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import Loader from '../components/loader';
import axios from 'axios';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react';
import { withRouter, Link } from 'react-router-dom';

class UserProfileArticle extends Component {
	state = {
		userData: {},
		userDetail: {},
		articles: [],
		userDataLoading : true,
		contentLoading : true
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
			url: store.getState().urlProfile+'/article',
			// url: store.getState().baseUrl + '/users/me/article',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			validateStatus: (status) => {
				return status < 500;
			}
		};

		let articleRes = await axios(article);
		this.setState({ articles: articleRes.data.query_data, contentLoading : false });
	};

	getUserDetail = async () => {
		const user = {
			method: 'get',
			url: store.getState().urlProfile,
			// url: store.getState().baseUrl + '/users/me',
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
		await this.getUserArticle()
        await this.props.history.push('/profil/artikel')
	}


	render() {
		return (
			<div>
				<Header doSearch={this.doSearch} />
				{this.state.userDataLoading === true? 
				<div className="pl-5 pr-5">
					<Loader/>
				</div> :
				<UserProfile userData={this.state.userData} userDetail={this.state.userDetail}/>
				}
				<div className="container">
					<div className="row">
						<div className="col-md-3" style={{ paddingTop: '5%' }}>
							<MenuBarProfile />
						</div>
						<div className="col-md-9 user-own-file overflow">
							<h5 className="text-center profile-title">Artikel</h5>
							{this.state.contentLoading === true ?
						<div>
							<Loader/>
						</div>	
						:
							this.state.articles.map((content) => (
								<UserOwnFile
									typeContent="article"
									content={content}
									userDetail={this.state.userData}
                                    userData={this.state.userData}
                                    editArticle={(e)=>this.editArticle(e)}
									detailArticle={(e) => this.detailArticle(e)}
									deleteArticle={(e)=>this.deleteArticle(e)} 
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

export default connect('', actions)(withRouter(UserProfileArticle));
