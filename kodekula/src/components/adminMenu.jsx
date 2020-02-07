import React from 'react';
import '../styles/css/header.css';
import '../styles/css/bootstrap.min.css';
import logo from '../images/NewLogo.png';
import user from '../images/user.png';
import notification from '../images/bell.png';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';

const AdminMenu = (props) => {
	// if (localStorage.getItem('email') === null) {
		return (
			<div className='conteiner'>
				<div className='row' style={{paddingTop:'100px'}}>
                    <div className='col-md-3' style={{paddingLeft:'30px', paddingRight:'30px'}}>
                        <div className='box-control btn-grad' style={{paddingBottom:'25px', paddingTop:'25px'}}>
                            User
                        </div>
                    </div>
                    <div className='col-md-3' style={{paddingLeft:'30px', paddingRight:'30px'}}>
                        <div className='box-control btn-glow' style={{paddingBottom:'25px', paddingTop:'25px'}}>
                            Pertanyaan
                        </div>   
                    </div>
                    <div className='col-md-3' style={{paddingLeft:'30px', paddingRight:'30px'}}>
                        <div className='box-control btn-sparkle' style={{paddingBottom:'25px', paddingTop:'25px'}}>
                            Jawaban
                        </div> 
                    </div>
                    <div className='col-md-3' style={{paddingLeft:'30px', paddingRight:'30px'}}>
                        <div className='box-control btn-hot' style={{paddingBottom:'25px', paddingTop:'25px'}}>
                            Tag
                        </div> 
                    </div>
                </div>
			</div>
		);
	// }
};

export default connect('', actions)(withRouter(AdminMenu));
