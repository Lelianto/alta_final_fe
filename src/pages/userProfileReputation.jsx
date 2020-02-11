import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import axios from 'axios';
import { actions, store } from '../stores/store';

class UserProfileReputation extends Component {

  state = {
    userData : {},
    userDetail : {},
    content : {}
  }

  doSearch = () => {
    this.props.history.push('/pencarian')
  }

  componentDidMount = async () => {
    await this.getUserDetail()
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

  render() {
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
                <UserOwnFile
                    typeContent="reputation"
                    userDetail ={this.state.userDetail}
                    userData = {this.state.userData}
                    content = {this.state.content}
                  />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default UserProfileReputation;
