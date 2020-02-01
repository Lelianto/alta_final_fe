import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import ProfileSetting from '../components/userProfileSetting';
import UserOwnFile from '../components/userOwnFile';
import MenuBarSetting from '../components/menuBarSetting';

class UserProfileSetting extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarSetting/>
            </div>
            <div className='col-md-9'>
              <ProfileSetting/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default UserProfileSetting;
