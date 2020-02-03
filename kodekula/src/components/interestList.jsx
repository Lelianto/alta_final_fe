import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import '../styles/css/home.css'
import all from '../images/all.svg'
import axios from 'axios';
import Swal from 'sweetalert2';

const InterestList = (props) => {
	return (
		<React.Fragment>
            <div className="border shadow-sm rounded pl-3 pr-2 pt-4 ml-2 mr-2 fixed-left" style={{backgroundColor:'#f8f9fa'}}>
                <div className="home-title mb-3 pl-2">Lini Masa</div>
                <div className="pl-2">
                    <div className="mb-3">
                        <input type="checkbox" id='all' defaultChecked onClick={()=>props.checkAll()}/>
                        <img src={all} className="pr-2 ml-2" width='30px'/>
                        <label for='all' style={{color:'#1b262c'}}>Semua</label>
                    </div>
                    {props.tags.map((value) => (
                        <div className='mb-3'>
                            <input type="checkbox" id={value.name} defaultChecked/>
                            <img src={value.photo_url} className="pr-2 ml-2" width="30px"/>
                            <label for={value.name} style={{color:'#1b262c'}}>{value.name}</label>
                        </div>
                    ))}
                </div>
                <div className="suggestion pl-2 mb-3">Saran</div>
                <div className="pl-2">
                    <div className="row mb-3 pl-3">
                        <Link style={{textDecoration:'none', fontSize:'16px'}} onClick={()=>props.seeAll()}id='seeAll'>Lihat Semua...</Link>
                    </div>
                    <div id='suggest-list' style={{display:'none'}}>
                        {props.excludeTags.map((value) => (
                            <div className='mb-3' >
                                <input type="checkbox" id={value.name}/>
                                <img src={value.photo_url} className="pr-2 ml-2" width="30px"/>
                                <label for={value.name} style={{color:'#1b262c'}}>{value.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
		</React.Fragment>
	);
};
export default connect('', actions)(withRouter(InterestList));
