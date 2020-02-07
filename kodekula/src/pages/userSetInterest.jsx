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
import { all } from 'q';

class UserSetInterest extends Component {

    state = {
      tags : []
    }

    doSearch = () => {
      this.props.history.push('/')
    }

    editInterest = async (event, index) => {
      let tags = this.state.tags
      console.warn('ini let tag ', tags)
      // tags[index]['checked'] = event.target.checked
      this.setState({tags : tags})
      if (event.target.checked === true) {
        await this.state.tags.push(event.target.value)
      } else {
        const newTags = this.state.tags.filter(item => item !== event.target.value)
        await this.setState({tags : newTags})
      }
      console.warn('tag',this.state.tags)
    }

    render() {

    const userInterest = this.props.filterInterest
    userInterest.map((tag)=> {
      tag.checked = true
      this.state.tags.push(tag.name)
    })


    const excludeTags = this.props.excludeTags;
    excludeTags.map((tag)=> {
      tag.checked = false
    })

    const allTags = userInterest.concat(excludeTags)
    allTags.map((tag, i)=> {
      tag.index = i
    })

    console.warn('all tags', allTags)

		const	tagData = allTags.map((tag) => {
				return (
					<React.Fragment>
						<div className="col-lg-3 col-md-3 col-sm-4 col-4 img-interest pb-3">
							<div className="border">
                  <div className='logo-tags' style={{ height:'200px'}}>
                      <img src={tag.photo_url} alt="" />
                  </div>
								<div className="text-center" style={{backgroundColor:'#0f4c75', color:'white'}}>
                  <input type="checkbox" name="tags" id="" checked={tag.checked} value={tag.name} onClick={(e)=>this.editInterest(e, tag.index)}/>
									<label className="form-check-label ml-3 tags-name" for="tags">
										{tag.name}
									</label>
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			});

    return (
      <div>
        <Header doSearch={this.doSearch}/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)}/>
            </div>
            <div className='col-md-9'>
            <div className="interest-user user-username" style={{fontWeight:'bold', fontSize:'20px'}}>
              <div className="pl-2">
                <span>Edit Minat</span>
                <input type="text" name="tags" id="" className="ml-5" placeholder="Pencarian"/>
                <div className='row user-profile-border pt-3' style={{marginLeft:'3px'}}></div>
              </div>
                <div className="row pl-2 pr-2 py-3 interest-list border" style={{height:'600px', overflow:'auto'}}>
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

export default connect("filterInterest, interestList, userInterest, excludeTags",actions)(withRouter(UserSetInterest));
