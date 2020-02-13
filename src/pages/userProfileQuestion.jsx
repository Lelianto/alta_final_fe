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
      contentLoading : true
     };
    }
  doSearch = ()=>{
    this.props.history.push('/pencarian')
  }

  componentDidMount = async () => {
    await this.getUserDetail()
    await this.getUserQuestion()
  }

  getUserQuestion = async ()=>{
    const question = {
      method: 'get',
      url: store.getState().urlProfile+'/question',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage.getItem("token")
      },
      validateStatus : (status) => {
        return status < 500
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
      },
      validateStatus : (status) => {
        return status < 500
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
          { this.state.questions === undefined ? 
          <div className="pl-5 pr-5">
            <Loader/>
          </div> :
                this.state.questions.map((content) => (
                  <UserOwnFile
                      typeContent="question"
                      content={content} 
                      editQuestion={(e)=>this.editQuestion(e)}
                      goToDetailQuestion={(e) => this.goToDetailQuestion(e)} 
                      userDetail ={this.state.userData}
                      userData = {this.state.userData}
                      deleteQuestion={(e)=>this.deleteQuestion(e)}
                    />
                ))
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
