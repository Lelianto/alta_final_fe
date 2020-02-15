import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import PersonalData from '../components/userProfileSetting';
import MenuBarSetting from '../components/menuBarSetting';
import { actions } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter } from 'react-router-dom';

class UserProfileSetting extends Component {
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
              <MenuBarSetting/>
            </div>
            <div className='col-md-9'>
              <PersonalData />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect("menuBarSetting, keyword",actions)(withRouter(UserProfileSetting));
