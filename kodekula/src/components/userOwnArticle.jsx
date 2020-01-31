import React from 'react';
import '../styles/css/userownarticle.css';
import '../styles/css/bootstrap.min.css';
import user from '../images/user.png';
import example from '../images/example-article.png';
import { actions } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter } from 'react-router-dom';

const UserOwnArticle = (props)=>{
    if (props.menuBarUser ==='Artikel') {
        return (
            <div className='container own-article'>
            <div className='row'>
                <div className='col-md-1'></div>
                <div className='col-md-10 box-control'>
                    <div className='row text-control'>
                        <div className='col-md-2 username-control'>
                            Judul Artikel
                        </div>
                        <div className='col-md-8'>
                            
                        </div>
                        <div className='col-md-2 edit-control'>
                            Edit
                        </div>
                    </div>
                    <div className='row text-control'>
                        <div className='col-md-4 username-control'>
                            <img className='writer-photo' src={user} alt="img"/> Penulis Artikel
                        </div>
                        <div className='col-md-6'>
                            
                        </div>
                        <div className='col-md-2 edit-control'>
                            Edit
                        </div>
                    </div>
                    <div className='row'>
                        <img className='image-control' src={example} alt="img"/>
                    </div>
                </div>
                <div className='col-md-1'></div>
            </div>
        </div>
        )
    } else if (props.menuBarUser ==='Pertanyaan') {
        return (
            <div className='container own-article'>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10 box-control'>
                        Pertanyaan
                    </div>
                    <div className='col-md-1'></div>
                </div>
            </div>
        )
    } else if (props.menuBarUser ==='Jawaban') {
        return (
            <div className='container own-article'>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10 box-control'>
                        Jawaban
                    </div>
                    <div className='col-md-1'></div>
                </div>
            </div>
        )
    } else if (props.menuBarUser ==='Reputasi') {
        return (
            <div className='container own-article'>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10 box-control'>
                        Reputasi
                    </div>
                    <div className='col-md-1'></div>
                </div>
            </div>
        )
    } else {
        return (
            <span></span>
        )
    }
}

export default connect("menuBarUser",actions)(withRouter(UserOwnArticle));