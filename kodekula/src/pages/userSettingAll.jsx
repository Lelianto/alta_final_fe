import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import ProfileSetting from '../components/userProfileSetting';
import MenuBarSetting from '../components/menuBarSetting';
import axios from 'axios';
import Swal from 'sweetalert2';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { withRouter, Link } from 'react-router-dom';

class UserProfileSetting extends Component {
  state = {
    userData : {},
    userDetail : {},
    userTagData : []
  }

  handlePage = (event)=>{
    this.props.history.replace('/pengaturan-akun'+event)
  }
  handleMainPage = (event1, event2)=>{
    store.setState({menuBarSetting:event2})
    this.props.history.replace('/pengaturan-akun'+event1)
  }
  componentDidMount = async () => {
    const user = {
			method: 'get',
			url: 'https://api.kodekula.com/users/me',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + localStorage.getItem("token")
			},
			validateStatus : (status) => {
                return status < 500
            }
		  };
		
      await axios(user)
			.then(async (response) => {
        await this.setState({userData : response.data.user_data, userDetail : response.data.user_detail_data, userTagData : response.data.user_tag_data})
			})
			.catch(async (error) => {
				await console.warn(error)
			})
  }

  doSearch = () => {
    this.props.history.push('/pencarian')
  }

  render() {
    return (
      <div>
        <Header doSearch={this.doSearch}/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)}/>
            </div>
            <div className='col-md-9'>
              <ProfileSetting handlePage={(event)=>this.handlePage(event)} userData={this.state.userData} userDetail={this.state.userDetail}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect("responseData, responseStatus",actions)(withRouter(UserProfileSetting));
