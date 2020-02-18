import React from 'react';
import '../styles/css/userprofile.css';
import '../styles/css/bootstrap.min.css';
import edit from '../images/edit.png';
import { actions } from '../stores/store';
import { connect } from 'unistore/react'
import { Link, withRouter } from 'react-router-dom';


const UserProfileSettings = (props) =>{
    return (
        <React.Fragment>
            <div className='container'>
                <div className='row user-profile'>
                    <div className='col-md-9'>
                        <div className='user-username row'>
                            <div style={{fontWeight:'bold', fontSize:'20px'}} className='col-md-5'>{(props.menuBarSetting==='Pengaturan Akun' || props.menuBarSetting==='Ubah Password')?
                                <span>{props.menuBarSetting}</span>:(props.menuBarSetting==='Minat')?
                                <div>{props.menuBarSetting} <Link onClick={()=>props.handlePage('/minat/edit')}><img width='20px' height='20px' src={edit} alt="img"/></Link></div>:<div>{props.menuBarSetting} <Link onClick={()=>props.handlePage('/data-diri/edit')}><img width='20px' height='20px' src={edit} alt="img"/></Link></div>}
                            </div>
                        </div>
                        <div className='row user-profile-border'></div>
                        {props.menuBarSetting==='Data Diri'?
                        <div>
                            <div className='profile-setting-top row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Nama Depan
                                </div>
                                <div className='col-md-1'>
                                    :
                                </div>
                                <div className='col-md-6'>
                                    {props.userDetail.first_name}
                                </div>
                            </div>
                            <div className='profile-setting row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Nama Belakang
                                </div>
                                <div className='col-md-1'>
                                    :
                                </div>
                                <div className='col-md-6'>
                                    {props.userDetail.last_name}
                                </div>
                            </div>
                            <div className='profile-setting row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Pekerjaan
                                </div>
                                <div className='col-md-1'>
                                    :
                                </div>
                                <div className='col-md-6'>
                                    {props.userDetail.job_title}
                                </div>
                            </div>
                            <div className='profile-setting row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Email
                                </div>
                                <div className='col-md-1'>
                                    :
                                </div>
                                <div className='col-md-6'>
                                    {props.userData.email}
                                </div>
                            </div>
                            <button onClick={()=>props.handlePage('/data-diri/edit')} type="button" class="btn btn-primary">Ubah</button>
                        </div>:<span></span>}
                        {props.menuBarSetting==='Ubah Password'?
                        <div>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className='profile-setting-top row'>
                                    <div style={{fontWeight:'bold', textAlign:'left'}} className='col-md-5'>
                                        <label for="password" className=" col-form-label input-box">
                                            Password Lama
                                        </label> 
                                    </div>
                                    <div className='col-md-7'>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                className="form-control input-box mr-0"
                                                id="setpassword"
                                                name="oldPassword"
                                                data-toggle="password"
                                                value={props.oldPassword}
                                                onChange={(e)=>props.changeState(e)}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <Link className="input-group-text" style={{height:'38px', textDecoration:'None'}} onClick={()=>props.showPassword('setpassword','setimgPassword')}>
                                                    <i className='material-icons' id='setimgPassword'>visibility</i>
                                                </Link>
                                            </div>
                                        </div>
                        
                                    </div>
                                </div>
                                <div className='profile-setting-top row'>
                                    <div style={{fontWeight:'bold', textAlign:'left'}} className='col-md-5'>
                                        <label for="password" className=" col-form-label input-box">
                                            Password Baru
                                        </label> 
                                    </div>
                                    <div className='col-md-7'>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                className="form-control input-box mr-0"
                                                id="setpassword1"
                                                name="newPassword"
                                                data-toggle="password"
                                                value={props.newPassword}
                                                onChange={(e)=>props.changeState(e)}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <Link className="input-group-text" style={{height:'38px', textDecoration:'None'}} onClick={()=>props.showPassword('setpassword1','setimgPassword1')}>
                                                    <i className='material-icons' id='setimgPassword1'>visibility</i>
                                                </Link>
                                            </div>
                                        </div>
                        
                                    </div>
                                </div>
                                <div className='profile-setting-top row'>
                                    <div style={{fontWeight:'bold', textAlign:'left'}} className='col-md-5'>
                                        <label for="password" className=" col-form-label input-box">
                                            Konfirmasi Password Baru
                                        </label> 
                                    </div>
                                    <div className='col-md-7'>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                className="form-control input-box mr-0"
                                                id="setpassword2"
                                                name="confirmPassword"
                                                data-toggle="password"
                                                value={props.confirmPassword}
                                                onChange={(e)=>props.changeState(e)}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <Link className="input-group-text" style={{height:'38px', textDecoration:'None'}} onClick={()=>props.showPassword('setpassword2','setimgPassword2')}>
                                                    <i className='material-icons' id='setimgPassword2'>visibility</i>
                                                </Link>
                                            </div>
                                        </div>
                        
                                    </div>
                                </div>
                                <button style={{marginTop:'44px'}} type="button" class="btn btn-primary" onClick={()=>props.changePassword()}>Ubah</button>
                            </form>
                        </div>: <span></span>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect("menuBarSetting",actions)(withRouter(UserProfileSettings));