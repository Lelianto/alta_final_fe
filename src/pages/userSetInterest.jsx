import React, { Component } from 'react';
import '../styles/css/menubar.css'
import '../styles/css/interest.css';
import '../styles/css/signUp.css';
import Header from '../components/header';
import Footer from '../components/footer';
import MenuBarSetting from '../components/menuBarSetting';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'

class UserSetInterest extends Component {

    state = {
      tags : [],
      interest : [],
      search : '',
      searchList : [],
      userDetail : this.props.userDetail
    }

    componentDidMount = async () => {
      const userInterest = await this.props.filterInterest
      userInterest.map((tag)=> {
        tag.checked = true
        this.state.tags.push(tag.name)
      })
  
  
      const excludeTags = await this.props.excludeTags;
      excludeTags.map((tag)=> {
        tag.checked = false
      })
  
      const allTags = await userInterest.concat(excludeTags)
      allTags.map((tag, i)=> {
        tag.index = i
      })
  
      await this.setState({interest : allTags, searchList : allTags})
    }

    doSearch = () => {
      this.props.history.push('/pencarian')
    }

    searchInterest = async (event) => {
      await this.setState({search : event.target.value})
      if (this.state.search.length > 0) {
        const searchData = this.state.interest.filter(item => item.name.toLowerCase().indexOf(this.state.search) > -1
        )
        await this.setState({searchList : searchData })
        
      } else {
        await this.setState({searchList : this.state.interest })
      }
    }

    editInterest = async (event, index) => {
      let interest = this.state.interest
      interest[index]['checked'] = event.target.checked

      this.setState({interest : interest})
      if (event.target.checked === true) {
        await this.state.tags.push(event.target.value)
      } else {
        const newTags = this.state.tags.filter(item => item !== event.target.value)
        await this.setState({tags : newTags})
      }
    }

    putInterest = async () => {
      const userDetail = {
        username : localStorage.getItem("username"),
        email : localStorage.getItem("email"),
        tags : this.state.tags
      }
  
      const editUser = {
        method: 'put',
        url: store.getState().baseUrl+ '/users/me',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        data : userDetail,
        validateStatus : (status) => {
          return status < 500
        }
      }
  
      await this.props.handleAPI(editUser)
      if (this.props.responseStatus === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Edit minat berhasil',
          showConfirmButton: false,
          timer: 1500
        })
        this.props.history.push('/pengaturan-akun/minat')
      }
    }

    handleMainPage = (event1, event2)=>{
      store.setState({menuBarSetting:event2})
      this.props.history.replace('/pengaturan-akun'+event1)
    }

    render() {
      const	tagData = this.state.searchList.map((tag, index) => {
          return (
            <React.Fragment>
              <div className="col-lg-3 col-md-3 col-sm-4 col-4 img-interest pb-3">
                <div className="border">
                    <div className='logo-tags' style={{ height:'200px'}}>
                        <img src={tag.photo_url} alt="" />
                    </div>
                  <div className="text-center" style={{backgroundColor:'#0f4c75', color:'white'}}>
                    <input type="checkbox" name="tags" id="" checked={tag.checked} value={tag.name} onChange={(e)=>this.editInterest(e, tag.index)}/>
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
                <MenuBarSetting handleMainPage={(event1,event2)=>this.handleMainPage(event1,event2)} userDetail={this.state.userDetail}/>
              </div>
              <div className='col-md-9'>
              <div className="interest-user user-username" style={{fontWeight:'bold', fontSize:'20px'}}>
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <span>Edit Minat</span>
                  </div>
                  <div className="col-lg-6 col-md-6 text-right">
                    <input style={{fontSize:'17px'}} type="text" name="tags" id="" className="ml-5" placeholder="Pencarian" onChange={(e)=>this.searchInterest(e)}/>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <button className='btn btn-info' onClick={this.putInterest}>Ubah</button>
                  </div>
                </div>
                  <div className='row user-profile-border pt-3' style={{marginLeft:'3px'}}></div>
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

export default connect("filterInterest, interestList, userInterest, excludeTags, responseStatus, userDetail",actions)(withRouter(UserSetInterest));
