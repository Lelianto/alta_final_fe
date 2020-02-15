import React from 'react';
import '../styles/css/userprofile.css';
import '../styles/css/bootstrap.min.css';
import { actions } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter } from 'react-router-dom';
import user from '../images/user.png';
import Loader from './loader';
import Moment from 'react-moment';

const UserProfile = (props) =>{
    return (
        <React.Fragment>
            <div className='container'>
                <div className='row user-profile'>
                    <div className='col-md-3'>
                        <div>
                            {props.userDetail.photo_url !== undefined && props.userDetail.photo_url !== null? 
                                <img className='dummy-photo' src={props.userDetail.photo_url} alt="img" style={{height : '217px', width:'217px'}}/>
                            :
                                <img className='dummy-photo' src={user} alt="img"/>
                            }
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <div className='user-username row'>
                            <div style={{fontWeight:'bold'}} className='col-md-3'>
                                Username
                            </div>
                            <div className='col-md-1'>
                                :
                            </div>
                            <div className='col-md-8'>
                                {props.userData.username}
                            </div>
                        </div>
                        <div className='user-full-name row'>
                            <div style={{fontWeight:'bold'}} className='col-md-3'>
                                Nama Lengkap
                            </div>
                            <div className='col-md-1'>
                                :
                            </div>
                            <div className='col-md-8'>
                                {props.userDetail.first_name+props.userDetail.last_name}
                            </div>
                        </div>
                        <div className='row user-job'>
                            <div style={{fontWeight:'bold'}} className='col-md-3'>
                                Pekerjaan
                            </div>
                            <div className='col-md-1'>
                                :
                            </div>
                            <div className='col-md-5'>
                                {props.userDetail.job_title}
                            </div>
                            <div className='join-this-web col-md-3'>
                                Bergabung sejak &nbsp; &nbsp;
                                <Moment format="DD/MM/YYYY">
                                {props.userData.created_at}
                                </Moment>
                            </div>
                        </div>
                        <div className='row user-profile-border'>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect("menuBarUser, isLoading",actions)(withRouter(UserProfile));