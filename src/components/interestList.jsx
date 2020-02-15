import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../stores/store';
import '../styles/css/home.css';
import all from '../images/all.svg';
import Skeleton from 'react-loading-skeleton';

const InterestList = (props) => {
    const displayTags = props.excludeTags.slice(0,8)
    const seeMoreTags = props.excludeTags.slice(8)
	return (
		<React.Fragment>
            <div className="pl-2 pr-2 pt-4 mr-2 fixed-left" >
                {localStorage.getItem('email')!==null && props.tags.length > 0 ? 
                    <div className="home-title mb-3 pl-2">Minat
                    </div>
                : null}
                    <div className="pl-2">
                        {props.tags.length > 1 ? 
                            <div className="mb-3 int-checkbox">
                                <input type="checkbox" id='all' defaultChecked onClick={()=>props.checkAll()}/>
                                <img src={all} alt="" className="pr-2 ml-2" width='30px'/>
                                <label for='all' style={{color:'#1b262c', fontSize:'14px', cursor:'pointer'}}>Semua</label>
                            </div>
                        : null}
                        {props.loading?
                        <div><Skeleton height={40} count={30}/></div>
                        :
                        <div>
                            { 
                                props.tags.map((value) => (
                                    <div className='mb-3 int-checkbox'>
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
                    </div>
                    <div className="pl-2">
                        <div>
                            {displayTags.map((value) => (
                                <div className='mb-3 int-checkbox'>
                                    <input type="checkbox" name='suggest' value={value.name} id={value.name} onClick={props.chooseTags}/>
                                    <img src={value.photo_url} alt="" className="pr-2 ml-2" width="30px"/>
                                    <label for={value.name} style={{color:'#1b262c', fontSize:'14px', cursor:'pointer'}}>{value.name}</label>
                                </div>
                            ))}
                        </div>
                        <div className="row mb-3 pl-3">
                            <Link style={{textDecoration:'none', fontSize:'15px'}} onClick={()=>props.seeAll()}id='seeAll'>Lihat Semua...</Link>
                        </div>
                        <div id='suggest-list' style={{display:'none', marginTop:'-16px'}}>
                            {seeMoreTags.map((value) => (
                                <div className='mb-3 int-checkbox' >
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
