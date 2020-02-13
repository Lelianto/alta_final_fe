import React, { Component } from 'react';
import '../styles/css/menubar.css'
import Header from '../components/header';
import Footer from '../components/footer';
import UserProfile from '../components/userProfile';
import UserOwnFile from '../components/userOwnFile';
import MenuBarProfile from '../components/menuBarProfile';
import Loader from '../components/loader';
import axios from 'axios';
import { actions, store } from '../stores/store';


class UserProfileReputation extends Component {

  state = {
    userData : {},
    userDetail : {},
    content : {},
    reputation : [],
    tags : [],
    reputationLoading : true
  }

  doSearch = () => {
    this.props.history.push('/pencarian')
  }

  componentDidMount = async () => {
    await this.getUserDetail()
    await this.getReputation()
    await this.getAllTags()
    await this.addTagLogo()
  }

  
  
  getUserDetail = async () => {
    const user = {
      method: 'get',
      url: store.getState().urlProfile,
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
  
  getReputation = async () => {
    const reputation = {
      method: 'get',
      url: store.getState().urlProfile+'/reputation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage.getItem("token")
      },
      validateStatus : (status) => {
        return status < 500
      }
    };

    const reputationRes = await axios(reputation)
    console.warn('respndse', reputationRes)
    this.setState({reputation : reputationRes.data})
  }

  getAllTags = async () => {
    const tags = {
      method: 'get',
      url: store.getState().baseUrl+'/tags',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const allTagsRes = await axios(tags)
    await this.setState({tags : allTagsRes.data})
    
  }

  addTagLogo = async () => {
    console.warn('state', this.state.reputation)
    const reputation = await this.state.reputation
    const tags = this.state.tags
    reputation.map(async (item) => {
      const sameTag = await tags.filter(tag => tag.name === item.tag_name)
      item['photo_url'] = sameTag[0].photo_url
    })
    const reputationCom = await reputation
    await this.setState({reputation : reputationCom, reputationLoading : false})
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
            <div className='col-md-9 user-own-file overflow'>
              <h5 className="text-center profile-title">Reputasi</h5>
              {this.state.reputationLoading === true ?
              <div className='pl-5 pr-5'>
                <Loader/>
              </div>
              :
                <UserOwnFile
                    typeContent="reputation"
                    userDetail ={this.state.userDetail}
                    userData = {this.state.userData}
                    content = {this.state.content}
                    reputation={this.state.reputation}
                  />
              }
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default UserProfileReputation;
