import React from 'react';
import '../styles/css/menubar.css';
import '../styles/css/bootstrap.min.css';
import question from '../images/help.png';
import answer from '../images/opinion.png';
import article from '../images/survey.png';
import user from '../images/user.png';
import { store, actions } from '../stores/store';
import { connect } from 'unistore/react'
import { Link, withRouter } from 'react-router-dom';

const MenuBarSetting = (props)=> {
    console.log('user detail', props.userDetail)
    return (
        <div className='container'>
            <div className='row menu-bar-photo'>
                <div>
                    {props.userDetail.photo_url===null?
                    <img className='dummy-photo-setting' src={user} />
                    :
                    <img className='dummy-photo-setting' style={{height : '217px', width:'217px'}} src={props.userDetail.photo_url}/>
                    }
                </div>
            </div>
            <div onClick={()=>props.handleMainPage('/data-diri','Data Diri')} className='row menu-bar menu-bar-fix'>
                <Link className='link-menu-bar' to='#'>
                    <img style={{width:'15%'}} src={question} alt="img"/>   Data Diri
                </Link>
            </div>
            <div onClick={()=>store.setState({menuBarSetting: 'Minat'})} onClick={()=>props.handleMainPage('/minat','Minat')} className='row menu-bar'>
                <Link className='link-menu-bar' to='#'>
                    <img style={{width:'15%'}} src={answer} alt="img"/>   Minat
                </Link>
            </div>
            <div onClick={()=>store.setState({menuBarSetting: 'Ubah Password'})} onClick={()=>props.handleMainPage('/ubah-password','Ubah Password')} className='row menu-bar'>
                <Link className='link-menu-bar' to='#'>
                    <img style={{width:'15%'}} src={article} alt="img"/>   Ubah Password
                </Link>
            </div>
        </div>
    )
}

export default connect("menuBarSetting, userOwnData",actions)(withRouter(MenuBarSetting));