import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import axios from 'axios';

class UserProfilePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserProfile/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarProfile/>
            </div>
            <div className='col-md-9 user-own-file'>
              {/* {this.state.postingList.map((content, i) => <UserOwnFile typeContent={content.content_type} content={content}/>)} */}
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
