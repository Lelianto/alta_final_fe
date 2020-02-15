import React from 'react';
import '../styles/css/menubar.css';
import '../styles/css/bootstrap.min.css';
import question from '../images/help.png';
import answer from '../images/opinion.png';
import article from '../images/survey.png';
import reputation from '../images/graphic.png';
import { store, actions } from '../stores/store';
import { connect } from 'unistore/react'
import { Link, withRouter } from 'react-router-dom';

const MenuBarProfile = ()=> {
    let path;
    if(store.getState().urlProfile === 'https://api.kodekula.com/users/me'){
        path = '/profil'
    } else {
        path = '/profil/'+store.getState().uname
    }
    return (
        <div className='container'>
            <div onClick={()=>store.setState({menuBarUser: 'Pertanyaan'})} className='row menu-bar menu-bar-fix'>
                <Link className='link-menu-bar' to={path+'/pertanyaan'}>
                    <img style={{width:'15%'}} src={question} alt="img"/>   Pertanyaan
                </Link>
            </div>
            <div onClick={()=>store.setState({menuBarUser: 'Jawaban'})} className='row menu-bar'>
                <Link className='link-menu-bar'  to={path+'/jawaban'}>
                    <img style={{width:'15%'}} src={answer} alt="img"/>   Jawaban
                </Link>
            </div>
            <div onClick={()=>store.setState({menuBarUser: 'Artikel'})} className='row menu-bar'>
                <Link className='link-menu-bar'  to={path+'/artikel'}>
                    <img style={{width:'15%'}} src={article} alt="img"/>   Artikel
                </Link>
            </div>
            <div onClick={()=>store.setState({menuBarUser: 'Reputasi'})} className='row menu-bar'>
                <Link className='link-menu-bar'  to={path+'/reputasi'}>
                    <img style={{width:'15%'}} src={reputation} alt="img"/>   Reputasi
                </Link>
            </div>
        </div>
    )
}

export default connect("menuBarUser",actions)(withRouter(MenuBarProfile));