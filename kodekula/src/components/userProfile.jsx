import React from 'react';
import '../styles/css/userprofile.css';
import '../styles/css/bootstrap.min.css';
import { actions } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter } from 'react-router-dom';
import user from '../images/user.png';

const UserProfile = (props) =>{
    return (
    <React.Fragment>
        <div className='container-fluid'>
            <div className='row user-profile'>
                <div className='col-md-3'>
                    <div>
                        <img className='dummy-photo' src={user} alt="img"/>
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
                            UserKodeKula
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
                            User Kodekula
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
                            Software Engineer
                        </div>
                        <div className='join-this-web col-md-3'>
                            Bergabung sejak 29 Januari 2020
                        </div>
                    </div>
                    <div className='row user-profile-border'>
                        
                    </div>
                    <div className='row title-menu-bar'>
                        {props.menuBarUser}
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}

export default connect("menuBarUser",actions)(withRouter(UserProfile));