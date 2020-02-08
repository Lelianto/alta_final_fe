import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import SetPersonalData from '../components/userSetPersonal';
import MenuBarSetting from '../components/menuBarSetting';
import axios from 'axios';
import { storage } from '../firebase';
import { Link, withRouter } from 'react-router-dom';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import Swal from 'sweetalert2'

class UserProfileSetting extends Component {
  state = {
    firstName : '',
    lastName : '',
    jobTitle : '',
    email : null,
    tags : [],
    imageArticle : null,
    imageUrl : ''
  }

  handleMainPage = (event1, event2)=>{
    store.setState({menuBarSetting:event2})
    this.props.history.replace('/pengaturan-akun'+event1)
  }

  setInput = async (event) => {
    await this.setState({ [event.target.name]: event.target.value });
    await console.warn('name', this.state.firstName)
    await console.warn('firstName', this.state.lastName)
  }

  componentDidMount = async () => {
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
		
      await axios(user)
			.then(async (response) => {
        const userDetail = response.data.user_detail_data
        const userData = response.data.user_data
        const userTag = response.data.user_tag_data
        await this.setState({firstName : userDetail.first_name, lastName : userDetail.last_name, jobTitle : userDetail.job_title, email : userData.email, tags : userTag, imageUrl : userDetail.user_detail_data.photo_url})
			})
			.catch(async (error) => {
				await console.warn(error)
			})
  }

  editUserData = async () => {
    let email;
    if (this.state.email === null) {
      email = localStorage.getItem('email')
    } else {
      email = this.state.email
    }
  
    const userDetail = {
			username : localStorage.getItem("username"),
      email : email + ' ',
      first_name : this.state.firstName + ' ',
      last_name : this.state.lastName + ' ',
      job_title : this.state.jobTitle + ' ',
      tags : this.state.tags,
      photo_url : this.state.imageUrl
    }
    
    console.warn('params', userDetail)

		const editUser = {
			method: 'put',
			url: store.getState().baseUrl+'/users/me',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + localStorage.getItem("token")
			},
			data : userDetail,
			validateStatus : (status) => {
        return status < 500
      }
		}

    await this.props.handleAPI(editUser)
		if (this.props.responseStatus === 200) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data diri berhasil diubah',
        showConfirmButton: false,
        timer: 1500
      })
			this.props.history.push('/pengaturan-akun/data-diri')
    }
    await this.props.deleteResponse()
  }

  doSearch = () => {
    this.props.history.push('/')
  }

  fileSelectedHandler= async(event)=>{
    if(event.target.files[0]){
      await this.setState({
        imageArticle:event.target.files[0]
      })
      await this.uploadPhoto()
      console.log('isi global photo',this.state.imageArticle)
    }
  }

  uploadPhoto = async ()=>{
      const image = this.state.imageArticle
      const uploadPhotos = storage.ref(`images/${image.name}`).put(image);
      await uploadPhotos.on('state_changed', 
      (snapshot) => {
          // Progress Function
      }, 
      (error) => {
          // Error Function
          console.log(error)
      }, 
      ()=>{
          // Complete Function
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
              this.setState({
                  imageUrl:url
              })
          })
          console.log('isi Link global', this.state.imageUrl)
      })
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
              <SetPersonalData fileSelectedHandler={(event)=>this.fileSelectedHandler(event)} firstName={this.state.firstName} lastName={this.state.lastName} jobTitle={this.state.jobTitle} email={this.state.email} imageUrl={this.state.imageUrl} changeState={this.setInput} editUserData={this.editUserData}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect("responseStatus",actions)(withRouter(UserProfileSetting));
