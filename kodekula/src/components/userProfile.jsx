import React from 'react';
import '../styles/css/userprofile.css';
import '../styles/css/bootstrap.min.css';
import { actions } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter } from 'react-router-dom';
import user from '../images/user.png';

const UserProfile = (props) =>{
    return (
    <div>
        <div className='container user-profile'>
            <div className='row'>
                <div className='col-md-3'>
                    <div>
                        <img className='dummy-photo' src={user} alt="img"/>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className='user-username row'>
                        Username
                    </div>
                    <div className='user-full-name row'>
                        Nama Lengkap
                    </div>
                    <div className='row'>
                        <div className='user-job col-md-3'>
                            Pekerjaan
                        </div>
                        <div className='col-md-6'>

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
    </div>
    )
}

export default connect("menuBarUser",actions)(withRouter(UserProfile));