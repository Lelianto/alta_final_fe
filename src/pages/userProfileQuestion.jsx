import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import axios from 'axios';
import { actions, store } from '../stores/store';
import Loader from '../components/loader'

class UserProfilePage extends Component {

  state = {
    userData : {},
    userDetail : {},
    questions : []
  }

  doSearch = () => {
    this.props.history.push('/pencarian')
  }

  componentDidMount = async () => {
    await this.getUserDetail()
    await this.getUserQuestion()
  }

  getUserQuestion = async () => {
    const question = {
      method: 'get',
      url: store.getState().baseUrl+'/users/me/question',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage.getItem("token")
      },
      validateStatus : (status) => {
        return status < 500
      }
    };

    const questionRes = await axios(question)
    await this.setState({questions : questionRes.data.query_data})
  }

  getUserDetail = async () => {
    const user = {
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

    const userRes = await axios(user)
    this.setState({userData : userRes.data.user_data, userDetail : userRes.data.user_detail_data})
  }

  editQuestion = async (event)=> {
    await store.setState({
        userId:event
    })
    await this.props.history.push('/pertanyaan/'+event +'/edit')
    }

  goToDetailQuestion = async (event) => {
    store.setState({
      userId: event
    });
    await this.props.history.push('/pertanyaan/' + event);
  };

  render() {

    if(this.state.questions === {}) {
      return (
        <Loader/>
      )
    } else {

      return (
        <div>
          <Header doSearch={this.doSearch}/>
          <UserProfile userData={this.state.userData} userDetail={this.state.userDetail}/>
          <div className='container'>
            <div className='row'>
              <div className='col-md-3' style={{paddingTop:'5%'}}>
                <MenuBarProfile/>
              </div>
              <div className='col-md-9 user-own-file'>
                <h5 className="text-center profile-title">Pertanyaan</h5>
                {this.state.questions.map((content) => (
                  <UserOwnFile
                      typeContent="question"
                      content={content} 
                      editQuestion={(e)=>this.editQuestion(e)}
                      goToDetailQuestion={(e) => this.goToDetailQuestion(e)} 
                      userDetail ={this.state.userData}
                      userData = {this.state.userData}
                    />
                ))}
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      );
    }
  }
}

export default UserProfilePage;
