import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import SetPersonalData from '../components/userSetPersonal';
import MenuBarSetting from '../components/menuBarSetting';
import { store } from '../stores/store';

class UserProfileSetting extends Component {
  handleMainPage = (event1, event2)=>{
    store.setState({menuBarSetting:event2})
    this.props.history.replace('/pengaturan-akun'+event1)
  }
  render() {
    return (
      <div>
        <Header/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)}/>
            </div>
            <div className='col-md-9'>
              <SetPersonalData/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default UserProfileSetting;
