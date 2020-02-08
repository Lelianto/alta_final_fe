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

class UserPasswordSetting extends Component {
  state = {
    userData : {},
    userDetail : {},
    userTagData : [],
    oldPassword : null,
    newPassword : null,
    confirmPassword : null
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
  changeState = async (event) => {
    await this.setState({[event.target.name] : event.target.value})
  }
  changePassword = async () => {
    if (this.state.newPassword === this.state.confirmPassword) {
      const parameters = {
        username : this.state.userData.username,
        email : this.state.userData.email,
        tags : this.state.userTagData,
        password : this.state.oldPassword,
        password_new : this.state.newPassword
      }

      const password = {
        method: 'put',
        url: 'https://api.kodekula.com/users/me',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        validateStatus : (status) => {
              return status < 500
          },
        data : parameters
        };
        await this.props.handleAPI(password)
        if (this.props.responseStatus === 200) {
          await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ubah Password Berhasil',
            showConfirmButton: false,
            timer: 1500
          })
          await this.setState({oldPassword : null, newPassword : null, confirmPassword : null})
          this.props.history.push('/pengaturan-akun')
        } else if (this.props.responseStatus === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Uups...',
            text: 'Password Salah'
        });
        }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Uups...',
        text: 'Konfirmasi Password tidak sesuai'
    });
    }
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
              <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)} userDetail={this.state.userDetail}/>
            </div>
            <div className='col-md-9'>
              <ProfileSetting handlePage={(event)=>this.handlePage(event)} userData={this.state.userData} userDetail={this.state.userDetail} changeState={this.changeState} changePassword={this.changePassword}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect("responseData, responseStatus",actions)(withRouter(UserPasswordSetting));
