import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';

class UserProfilePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserProfile/>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarProfile/>
            </div>
            <div className='col-md-9'>
              <UserOwnFile/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default UserProfilePage;
