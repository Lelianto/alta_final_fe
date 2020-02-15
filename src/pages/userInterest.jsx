import React, { Component } from 'react';
import '../styles/css/menubar.css'
import '../styles/css/interest.css';
import '../styles/css/signUp.css';
import Header from '../components/header';
import Footer from '../components/footer';
import MenuBarSetting from '../components/menuBarSetting';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import edit from '../images/edit.png';

class UserInterestSetting extends Component {

    state = {
      userDetail : {},
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
        url: store.getState().baseUrl+'/users/me',
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
          await this.setState({userInterest : response.data.user_tag_data, userDetail : response.data.user_detail_data})
          await store.setState({userInterest : response.data.user_tag_data, userDetail:response.data.user_detail_data})
        })
        .catch(async (error) => {
          await console.warn(error)
        })
        
        await this.getAllTags()
      }
      
    getAllTags = async () => {
      const tags = {
        method: 'get',
        url: store.getState().baseUrl+'/tags',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const self = this
      await axios(tags)
      .then(async (response) => {
        await self.setState({interestList : response.data})
        await store.setState({interestList : response.data})
      })
      .catch(async (error) => {
        switch (error.response.status) {
					case 401 :
						self.props.history.push('/401')
						break
					case 403 :
						self.props.history.push('/403')
						break
					case 404 :
						self.props.history.push('/404')
						break
					case 422 :
						self.props.history.push('/422')
						break
					case 500 :
						self.props.history.push('/500')
						break
					default :
						break
				}
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

    doSearch = () => {
      this.props.history.push('/pencarian')
    }

    render() {

    let tagsList = this.state.filterInterest;
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
        <Header doSearch={this.doSearch}/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)} userDetail={this.state.userDetail}/>
            </div>
            <div className='col-md-9'>
            <div className="interest-user user-username" style={{fontWeight:'bold', fontSize:'20px'}}>
              <div className="pl-2">
                <span>Minat</span>
                <Link onClick={()=>this.props.history.push('/pengaturan-akun/minat/edit')}><img width='20px' height='20px' src={edit} alt="" style={{marginLeft:'3%'}}/></Link>
                <div className='row user-profile-border pt-3' style={{marginLeft:'3px'}}></div>
              </div>
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

export default connect("filterInterest, interestList, userInterest, excludeTags, userOwnData, isLoading",actions)(withRouter(UserInterestSetting));
