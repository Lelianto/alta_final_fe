import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import '../styles/css/home.css'
import question from '../images/problem.png';
import article from '../images/article.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import Truncate from 'react-truncate'

const PopularList = (props) => {
	return (
		<React.Fragment>
            <div className="border rounded pl-3 pr-2 pt-4 ml-2 mr-2 fixed-left bg-white mt-4" style={{backgroundColor:'#f8f9fa'}}>
                <div className="home-title mb-3 pl-2">Artikel Populer
                <img style={{width:'40px', height:'40px', marginLeft:'20px', marginBottom:'5px'}} src={article} alt=""/>
                </div>
                <div className="pl-1">
                    {props.popularArticle.map((value) => (
                    <div>
                        <div className='row mb-3 mr-2'>
                            <div className="col-2">
                                <i className='material-icons pr-1 pt-1' style={{color : '#0f4c75', fontSize:'18px'}}>label</i>
                            </div>
                            <div className="col-10 pl-0">
                                    <Link onClick={()=>props.detailArticle(value.id)} style={{textDecoration: 'none', fontSize:'15px'}}>
                                <Truncate lines={2}>
                                        {value.title}
                                </Truncate>
                                    </Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="border bg-white rounded pl-3 pr-2 pt-4 ml-2 mr-2 mt-4 fixed-left" style={{backgroundColor:'#f8f9fa'}}>
                <div className="home-title mb-3 pl-2">Pertanyaan Populer
                    <img style={{width:'40px', height:'40px', marginLeft:'20px', marginBottom:'5px'}} src={question} alt=""/>
                </div>
                <div className="pl-1">
                    {props.popularQuestion.map((value) => (
                    <div>
                        <div className='row mb-3 mr-2'>
                            <div className="col-2">
                                <i className='material-icons pr-1 pt-1' style={{color : '#0f4c75', fontSize:'18px'}}>label</i>
                            </div>
                            <div className="col-10 pl-0">
                                    <Link onClick={()=>props.detailQuestion(value.id)} style={{textDecoration: 'none', fontSize:'15px'}}>
                                <Truncate lines={2}>
                                        {value.title}
                                </Truncate>
                                    </Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
		</React.Fragment>
	);
};
export default connect('popularArticle, popularQuestion', actions)(withRouter(PopularList));
