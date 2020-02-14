import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import '../styles/css/home.css';
import all from '../images/all.svg';
import favorite from '../images/stars.png';
import suggest from '../images/suggest.png';
import Loader from './loader';
import axios from 'axios';
import Swal from 'sweetalert2';


const InterestList = (props) => {
	return (
		<React.Fragment>
            <div className="pl-2 pr-2 pt-4 mr-2 fixed-left" >
                {localStorage.getItem('email')!==null && props.tags.length > 0 ? 
                    <div className="home-title mb-3 pl-2">Minat
                    {/* <img style={{width:'40px', height:'40px', marginLeft:'20px', marginTop:'-10px'}} src={favorite} alt=""/> */}
                    </div>
                : null}
                    <div className="pl-2">
                        {props.tags.length > 1 ? 
                            <div className="mb-3">
                                <input type="checkbox" id='all' defaultChecked onClick={()=>props.checkAll()}/>
                                <img src={all} alt="" className="pr-2 ml-2" width='30px'/>
                                <label for='all' style={{color:'#1b262c', fontSize:'14px', cursor:'pointer'}}>Semua</label>
                            </div>
                        : null}
                        {props.loading?
                        <div><Loader/></div>
                        :
                        <div>
                            { 
                                props.tags.map((value) => (
                                    <div className='mb-3'>
                                            <input type="checkbox" name={value.name} value={value.name} id={value.name} onClick={props.chooseTags} defaultChecked/>
                                            <img src={value.photo_url} alt="img" className="pr-2 ml-2" width="30px"/>
                                            <label for={value.name} style={{color:'#1b262c', fontSize:'14px', cursor:'pointer'}}>{value.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                        }
                    </div>
                {props.locationPage === null || localStorage.getItem('email') === null ? 
                <div>
                    <div className="suggestion pl-2 mb-3">Saran
                        {/* <img style={{width:'30px', height:'30px', marginLeft:'20px', marginBottom:'5px'}} src={suggest} alt=""/> */}
                    </div>
                    <div className="pl-2">
                        <div className="row mb-3 pl-3">
                            <Link style={{textDecoration:'none', fontSize:'15px'}} onClick={()=>props.seeAll()}id='seeAll'>Lihat Semua...</Link>
                        </div>
                        <div id='suggest-list' style={{display:'none'}}>
                            {props.excludeTags.map((value) => (
                                <div className='mb-3' >
                                    <input type="checkbox" name='suggest' value={value.name} id={value.name} onClick={props.chooseTags}/>
                                    <img src={value.photo_url} alt="" className="pr-2 ml-2" width="30px"/>
                                    <label for={value.name} style={{color:'#1b262c', fontSize:'14px', cursor:'pointer'}}>{value.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                : null}
            </div>
		</React.Fragment>
	);
};
export default connect('isLoading, locationPage', actions)(withRouter(InterestList));
