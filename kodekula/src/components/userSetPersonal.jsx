import React from 'react';
import '../styles/css/userprofile.css';
import '../styles/css/bootstrap.min.css';
import edit from '../images/edit.png';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { Link, withRouter } from 'react-router-dom';


const UserSetPersonal = (props) =>{
    return (
    <React.Fragment>
        <div className='container'>
            <div className='row user-profile'>
                <div className='col-md-9'>
                    <div className='user-username row'>
                        <div style={{fontWeight:'bold', fontSize:'20px'}} className='col-md-5'>{(props.menuBarSetting==='Pengaturan Akun' || props.menuBarSetting==='Ubah Password')?
                            <span>{props.menuBarSetting}</span>:(props.menuBarSetting==='Minat')?
                            <div>{props.menuBarSetting} <Link><img width='20px' height='20px' src={edit} alt="img"/></Link></div>:<div>{props.menuBarSetting} <Link><img width='20px' height='20px' src={edit} alt="img"/></Link></div>}
                        </div>
                        
                    </div>
                    <div className='row user-profile-border'>  
                    </div>
                    <div>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className='profile-setting-top row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Nama Depan
                                </div>
                                <div style={{marginTop:'-5px'}} className='col-md-7'>
                                    <input type="text" class="form-control" name="firstName" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukkan Nama Depan" value={props.firstName} onChange={(e)=>props.setInput(e)}/>
                                </div>
                            </div>
                            <div className='profile-setting row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Nama Belakang
                                </div>
                                <div style={{marginTop:'-5px'}} className='col-md-7'>
                                    <input type="text" class="form-control" name="lastName" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukkan Nama Belakang" value={props.lastName} onChange={(e)=>props.setInput(e)}/>
                                </div>
                            </div>
                            <div className='profile-setting row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Pekerjaan
                                </div>
                                <div style={{marginTop:'-5px'}} className='col-md-7'>
                                    <input type="text" class="form-control"  name="jobTitle" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukkan Pekerjaan" value={props.jobTitle} onChange={(e)=>props.setInput(e)}/>
                                </div>
                            </div>
                            <div className='profile-setting row'>
                                <div style={{fontWeight:'bold'}} className='col-md-5'>
                                    Email
                                </div>
                                <div style={{marginTop:'-5px'}} className='col-md-7'>
                                    <input type="text" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukkan Email" value={props.email} onChange={(e)=>props.setInput(e)}/>
                                </div>
                            </div>
                            <div className='profile-setting row'>
                                <label style={{fontWeight:'bold'}} className='col-md-5'>
                                    Foto Profil
                                </label>
                                <div style={{marginTop:'-5px'}} className='col-md-7'>
                                    <button type="button" class="btn btn-dark">Pilih Foto</button>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" onClick={()=>props.editUserData()}>Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}

export default connect("menuBarSetting",actions)(withRouter(UserSetPersonal));