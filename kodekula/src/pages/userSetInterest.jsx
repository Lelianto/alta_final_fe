import React, { Component } from 'react';
import '../styles/css/menubar.css'
import '../styles/css/interest.css';
import '../styles/css/signUp.css';
import Header from '../components/header';
import Footer from '../components/footer';
import PersonalData from '../components/userProfileSetting';
import MenuBarSetting from '../components/menuBarSetting';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import edit from '../images/edit.png';

class UserSetInterest extends Component {


    render() {

    const userInterest = this.props.userInterest;
    const excludeTags = this.props.excludeTags;
    console.warn('user', userInterest)
    console.warn('exclude', excludeTags)

    return (
      <div>
        <Header/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)}/>
            </div>
            <div className='col-md-9'>
            <div className="interest-user user-username" style={{fontWeight:'bold', fontSize:'20px'}}>
              <div className="pl-2">
                <span>Minat</span>
                <Link onClick={()=>this.props.history.push('/minat/edit')}><img width='20px' height='20px' src={edit} alt="" style={{marginLeft:'3%'}}/></Link>
                <div className='row user-profile-border pt-3' style={{marginLeft:'3px'}}></div>
              </div>
                <div className="row pl-2 pr-2 py-3 interest-list">
                    {/* {tagData}         */}
                </div>
            </div>
          </div>
        </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect("filterInterest, interestList, userInterest, excludeTags",actions)(withRouter(UserSetInterest));
