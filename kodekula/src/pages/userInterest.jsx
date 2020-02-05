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

class UserInterestSetting extends Component {

    state = {
      userInterest: [],
      interestList : [],
      filterInterest : [],
      excludeTags : []
    }

    componentDidMount = async () => {
      await this.getUserTags()
      };
  
    getUserTags = async () => {
      const tags = {
        method: 'get',
        url: 'https://kodekula.com/users/me',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        validateStatus : (status) => {
                  return status < 500
              }
      };
      
          await axios(tags)
        .then(async (response) => {
          await this.setState({userInterest : response.data.user_tag_data})

        })
        .catch(async (error) => {
          await console.warn(error)
        })
        
        await this.getAllTags()
      }
      
    getAllTags = async () => {
      const tags = {
        method: 'get',
        url: 'https://kodekula.com/tags',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axios(tags)
      .then(async (response) => {
        await this.setState({interestList : response.data})
        await store.setState({interestList : response.data})
      })
      .catch(async (error) => {
        await console.warn(error)
      })
      
      await this.filterTags()
      
    }
    
    filterTags = async () => {
      const interestList = this.state.interestList
      const userInterest = this.state.userInterest
      let filterInterest = []
      let excludeTags = []
      let i
      for (i=0; i<interestList.length; i++) {
        if (userInterest.includes(interestList[i].name)) {
          filterInterest.push(interestList[i])
        } else {
          excludeTags.push(interestList[i])
        }
      }
  
      await this.setState({filterInterest : filterInterest, excludeTags : excludeTags})
      await store.setState({filterInterest : filterInterest, excludeTags : excludeTags})
    }

    handleMainPage = (event1, event2)=>{
        store.setState({menuBarSetting:event2})
        this.props.history.replace('/pengaturan-akun'+event1)
    }

    render() {

    let tagsList = this.state.filterInterest;
    console.warn('filter interest', tagsList)
		let tagData;
		if (tagsList !== undefined && tagsList !== null) {
			tagData = tagsList.map((tag) => {
				return (
					<React.Fragment>
						<div className="col-lg-3 col-md-3 col-sm-4 col-4 img-interest pb-3">
							<div className="border">
                  <div className='logo-tags' style={{ height:'200px'}}>
                      <img src={tag.photo_url} alt="" />
                  </div>
								<div className="text-center" style={{backgroundColor:'#0f4c75', color:'white'}}>
									<label className="form-check-label ml-3 tags-name" for="tags">
										{tag.name}
									</label>
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			});
        }

    return (
      <div>
        <Header/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)}/>
            </div>
            <div className='col-md-9'>
            <div className="interest-user">
                <span>Minat</span>
                <div className="row pl-2 pr-2 py-3 interest-list">
                    {tagData}        
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

export default connect("filterInterest, interestList, userInterest, excludeTags",actions)(withRouter(UserInterestSetting));
