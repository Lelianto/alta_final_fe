import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import '../styles/css/home.css'
import all from '../images/all.svg'
import axios from 'axios';
import Swal from 'sweetalert2';

const PopularList = (props) => {
	return (
		<React.Fragment>
            <div className="border shadow-sm rounded pl-3 pr-2 pt-4 ml-2 mr-2" style={{backgroundColor:'#f8f9fa'}}>
                <div className="popular-title mb-3 pl-2">Artikel Populer</div>
                <div className="pl-1">
                    {props.article.map((value) => (
                    <div>
                        <div className='row mb-3 mr-2'>
                            <div className="col-2">
                                <i className='material-icons pr-1 pt-1' style={{color : '#0f4c75'}}>radio_button_checked</i>
                            </div>
                            <div className="col-10">
                                <Link style={{textDecoration: 'none', fontSize:'15px'}}>{value}</Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="border shadow-sm rounded pl-3 pr-2 pt-4 ml-2 mr-2 mt-4" style={{backgroundColor:'#f8f9fa'}}>
                <div className="popular-title mb-3 pl-2">Pertanyaan Populer</div>
                <div className="pl-1">
                    {props.article.map((value) => (
                    <div>
                        <div className='row mb-3 mr-2'>
                            <div className="col-2">
                                <i className='material-icons pr-1 pt-1' style={{color : '#0f4c75'}}>radio_button_checked</i>
                            </div>
                            <div className="col-10">
                                <Link style={{textDecoration: 'none', fontSize:'15px'}}>{value}</Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
		</React.Fragment>
	);
};
export default connect('', actions)(withRouter(PopularList));
