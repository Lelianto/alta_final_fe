import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import axios from 'axios';
import { store, actions  } from '../stores/store';
import Loader from '../components/loader'
import { connect} from 'unistore/react';
import { withRouter, Link } from 'react-router-dom';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userData : {},
      userDetail : {},
      questions : [],
      userDataLoading : true,
      contentLoading : true,
      likeList : [],
      likeListLoading : true
     };
    }
    
  doSearch = ()=>{
    this.props.history.push('/pencarian')
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

  componentDidMount = async () => {
    this.getUserDetail()
    this.getUserQuestion()
    if(localStorage.getItem('token')!==null){
      this.getLikeList()
    } else {
      this.setState({likeListLoading : false})
    }
  }

  getUserQuestion = async ()=>{
    const question = {
      method: 'get',
      url: store.getState().urlProfile+'/question',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage.getItem("token")
      }
    };

    const questionRes = await axios(question)
    await this.setState({questions : questionRes.data.query_data, contentLoading : false})
  }

  getUserDetail = async () =>{
    const user = {
      method: 'get',
      url: store.getState().urlProfile,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage.getItem("token")
      }
    };

    const userRes = await axios(user)
    await this.setState({userData : userRes.data.user_data, userDetail : userRes.data.user_detail_data, userDataLoading : false})
  }

  editQuestion = async (event) =>{
    await store.setState({
        userId:event
    })
    await this.props.history.push('/pertanyaan/'+event +'/edit')
    }

  goToDetailQuestion = async(event)=>{
    store.setState({
      userId: event
    });
    await this.props.history.push('/pertanyaan/' + event);
  };

  deleteQuestion = async (event)=> {
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delQuestion()
		await this.getUserQuestion()
    await this.props.history.push('/profil/pertanyaan')
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

  render() {

      return (
        <div>
          <Header doSearch={this.doSearch}/>
          {this.state.userDataLoading === true || this.state.userDetail === {} ||  this.state.userDetail === undefined ?
          <div className="pl-5 pr-5">
          <Loader/>
        </div> :
            <UserProfile userData={this.state.userData} userDetail={this.state.userDetail}/>
          }
          <div className='container'>
            <div className='row'>
              <div className='col-md-3' style={{paddingTop:'5%'}}>
                <MenuBarProfile/>
              </div>
              <div className='col-md-9 user-own-file overflow'>
                <h5 className="text-center profile-title">Pertanyaan</h5>
          { this.state.questions !== undefined && !this.state.likeListLoading? 
            this.state.questions.map((content) => (
              <UserOwnFile
                  typeContent="question"
                  content={content} 
                  editQuestion={(e)=>this.editQuestion(e)}
                  goToDetailQuestion={(e) => this.goToDetailQuestion(e)} 
                  userDetail ={this.state.userData}
                  userData = {this.state.userData}
                  deleteQuestion={(e)=>this.deleteQuestion(e)}
                  likeList = {this.state.likeList}
                  getProfile={this.getProfile}
                />
            ))
            :
          <div className="pl-5 pr-5">
            <Loader/>
          </div> 
          }
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      );
    // }
  }
}

export default connect('', actions)(withRouter(UserProfilePage));
