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
			<div className='container'>
				<div className='row' style={{paddingTop:'100px'}}>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>props.handleChangePage('/pengguna')} className='box-control btn-grad' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            User
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>props.handleChangePage('/artikel')} className='box-control btn-glow' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            Artikel
                        </div>   
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>props.handleChangePage('/pertanyaan')} className='box-control btn-glow' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            Pertanyaan
                        </div>   
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>props.handleChangePage('/jawaban')} className='box-control btn-sparkle' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            Jawaban
                        </div> 
                    </div>
                    <div className='col-md-2'>

                        <div onClick={()=>props.handleChangePage('/tag')} className='box-control btn-hot' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            Tag
                        </div> 
                    </div>
                    <div className='col-md-1'>
                    </div>
                </div>
			</div>
		);
	// }
};

export default connect('', actions)(withRouter(AdminMenu));
