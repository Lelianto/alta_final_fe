import React from 'react';
import '../styles/css/userownarticle.css';
import '../styles/css/bootstrap.min.css';
import user from '../images/user.png';
import more from '../images/ellipsis.png';
import eye from '../images/eye.png';
import like from '../images/like.png';
import havelike from '../images/have-like.png';
import comment from '../images/comment.png';
import examplelang from '../images/python-example.png'
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import Truncate from 'react-truncate'
import Loader from './loader';
import Moment from 'react-moment';

const UserOwnFile = (props) => {
    
    const userData = props.content.user_data
    const postingDetail = props.content.posting_detail

    if (props.menuBarUser ==='Artikel' || props.typeContent ==='article') {
        return (
            <div className='container own-article mt-4'>
            <div className='row'>
                <div className='col-md-12 box-control bg-white'>
                    <div className='row text-control'>
                    {postingDetail.content_status === 2 ? 
                        <div className='col-md-11 title-article-control' >
                            {postingDetail.title} 
                        </div>
                        :
                        <Link className='col-md-11 title-article-control' onClick={()=>props.detailArticle(postingDetail.id)} >
                            {postingDetail.title} 
                        </Link>
                    }
                        {props.userDetail.user_id === postingDetail.user_id && postingDetail.content_status === 0 && store.getState().urlProfile === 'http://13.229.122.5:5000/users/me'?
                        <div> 
                            <div className='col-md-1 edit-control' id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className='logo-edit-control' src={more} alt="img"/>
                            </div>
                            <div class="dropdown-menu" style={{marginLeft:'-115px', marginTop:'-37px'}} aria-labelledby="dropdownMenuLink">
                                <Link onClick={()=>props.editArticle(postingDetail.id)} class="dropdown-item" >Ubah/Perbarui</Link>
                                <Link onClick={()=>props.deleteArticle(postingDetail)} class="dropdown-item">Hapus</Link>
                            </div>
                        </div>
                        : postingDetail.content_status === 2 ?  
                            <div className='row col-md-4 text-center' style={{backgroundColor:'red', fontWeight:'bold', color:'white', margin:'10px', height:'25px', paddingLeft:'26px'}}>
                                <i className="material-icons">delete</i>
                                <p>
                                    Artikel telah dihapus
                                </p>
                            </div>
                        : null }
                    </div>
                    <div className='row text-control'>
                        <div className='col-md-4 username-control'>
                        <div>
                            {userData.photo_url !== null || userData.photo_url !== "null" ? 
                                <img className='writer-photo' src={userData.photo_url} alt="" style={{height:'38px', width:'38px'}}/>
                                :
                                <img className='writer-photo' src={user} alt="img"/>
                            }
                            {postingDetail.content_status === 2 ? 
                                <Link style={{textDecoration: 'none', color:'#385898'}}>{userData.display_name}</Link>
                            :
                                <Link onClick={()=>props.getProfile(postingDetail.user_id, userData.username)} style={{textDecoration: 'none', color:'#385898'}}>{userData.display_name}</Link>
                            }
                        </div> 
                        </div>
                        <div className='col-md-5'>
                            
                        </div>
                    </div>
                    <div className='row'>
                        {postingDetail.banner_photo_url !== null ? <img className='image-control' src={postingDetail.banner_photo_url} alt="img"/> : null}
                    </div>
                    <div className='row detail-article-control text-truncate'>
                        <Truncate lines={3}>
                            <Markup content={postingDetail.html_content}/>
                        </Truncate>
                    </div>
                    <div className='col-md-12 ml-0 pl-1 time-article-control text-left'>
                        <Moment fromNow ago>{postingDetail.created_at}</Moment> ago
                        {postingDetail.updated_at !== null ? 
                    <React.Fragment>
                      &nbsp;&nbsp;&nbsp;&nbsp; Edited
                    </React.Fragment>
                    : null }
                    </div>
                    <div className='row tag-control-article align-items-end'>
                        <div className='col-md-8'>
                            <div className='row' style={{paddingLeft:'7px'}}>
                                {postingDetail.tags !== undefined ? 
                                    postingDetail.tags.map((tag)=>(
                                        <div className='col-md-3 tag-control-arc'>
                                            #{tag}
                                        </div>
                                    ))
                                : null}
                            </div>
                        </div>
                        <div className='col-md-1'></div>
                        <div className='col-md-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={eye} alt="img"/>{postingDetail.views}
                                </div>
                                {(props.likeArticle === true)?
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeArticle:false})} style={{width:'100%'}} src={like} alt="img"/>{postingDetail.point+1}
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeArticle:true})} style={{width:'100%'}} src={havelike} alt="img"/>{postingDetail.point}
                                    </div>
                                }
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={comment} alt="img"/>{postingDetail.sl_amount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-1'></div>
            </div>
        </div>
        )
    } else if (props.menuBarUser ==='Pertanyaan' || props.typeContent ==='question') {
        return (
            <div className='container own-article mt-4'>
            <div className='row'>
                <div className='col-md-12 box-control bg-white'>
                    <div className='row text-control'>
                        {postingDetail.content_status === 2 ? 
                        <div className='col-md-11 title-article-control' >
                            {postingDetail.title} 
                        </div>
                        :
                        <Link className='col-md-11 title-article-control' onClick={()=>props.goToDetailQuestion(postingDetail.id)} >
                            {postingDetail.title} 
                        </Link>
                    }
                        {props.userDetail.user_id === postingDetail.user_id && postingDetail.content_status === 0 && store.getState().urlProfile === 'http://13.229.122.5:5000/users/me' ?
                        <div>
                            <div className='col-md-1 edit-control' id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className='logo-edit-control' src={more} alt="img"/>
                            </div>
                            <div class="dropdown-menu" style={{marginLeft:'-130px', marginTop:'-37px'}}  aria-labelledby="dropdownMenuLink">
                                <Link class="dropdown-item" onClick={()=>props.editQuestion(postingDetail.id)} >Ubah/Perbarui</Link>
                                <Link onClick={()=>props.deleteQuestion(postingDetail)} class="dropdown-item" >Hapus</Link>
                            </div>
                        </div>
                        : postingDetail.content_status === 2 ?
                            <div className='row col-md-5 text-center' style={{backgroundColor:'red', fontWeight:'bold', color:'white', margin:'10px', height:'25px', paddingLeft:'37px'}}>
                                <i className="material-icons">delete</i>
                                <p>
                                    Pertanyaan telah dihapus
                                </p>
                            </div>
                        :
                            null
                        }
                    </div>
                    <div className='row text-control'>
                        <div className='col-md-4 username-control'>
                            <div>
                                {userData.photo_url !== null ? 
                                    <img className='writer-photo' src={userData.photo_url} alt="img" style={{height:'38px', width:'38px'}}/>
                                    :
                                    <img className='writer-photo' src={user} alt="img"/>
                                }
                                {postingDetail.content_status === 2 ? 
                                    <Link style={{textDecoration: 'none', color:'#385898'}}>{userData.display_name}</Link>
                                :
                                    <Link onClick={()=>props.getProfile(postingDetail.user_id, userData.username)} style={{textDecoration: 'none', color:'#385898'}}>{userData.display_name}</Link>
                                }
                            </div>
                        </div>
                        <div className='col-md-5'>
                            
                        </div>
                    </div>
                    <div className='row detail-article-control'>
                    <Truncate lines={3} ellipsis={<span>...</span>}>
                        <Markup content={postingDetail.html_content}/>
                    </Truncate>
                    </div>
                    <div className='col-md-12 ml-0 pl-1 time-article-control text-left'>
                        <Moment fromNow ago>{postingDetail.created_at}</Moment> ago
                        {postingDetail.updated_at !== null ? 
                    <React.Fragment>
                      &nbsp;&nbsp;&nbsp;&nbsp; Edited
                    </React.Fragment>
                    : null }
                    </div>
                    <div className='row tag-control-article align-items-end'>
                        <div className='col-md-8'>
                            <div className='row' style={{paddingLeft:'7px'}}>
                                {postingDetail.tags !== undefined ? 
                                    postingDetail.tags.map((tag)=>(
                                        <div className='col-md-3 tag-control-arc'>
                                            #{tag}
                                        </div>
                                    ))
                                : null}
                            </div>
                        </div>
                        <div className='col-md-1'></div>
                        <div className='col-md-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={eye} alt="img"/>{postingDetail.views}
                                </div>
                                {(props.likeQuestion === true)?
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeQuestion:false})} style={{width:'100%'}} src={like} alt="img"/> {postingDetail.point+1}
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeQuestion:true})} style={{width:'100%'}} src={havelike} alt="img"/> {postingDetail.point}
                                    </div>
                                }
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={comment} alt="img"/>{postingDetail.sl_amount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    } else if (props.menuBarUser ==='Jawaban' || props.typeContent ==='answer') {
        return (
            <div className='container own-article'>
            <div className='row'>
                <div className='col-md-12 box-control bg-white'>
                    <div className='row text-control'>
                        <Link to={'/pertanyaan/'+props.content.parent_detail.id}  className='col-md-11 detail-answer-control'>
                            {props.content.parent_detail.title}
                        </Link>
                    </div>
                    <div className='row'>
                        <div className='detail-answered-control'>
                            Jawaban
                        </div>
                    </div>
                    <p></p>
                        <div className='container own-article'>
                            <div className='row'>
                                <div className='col-md-12 box-control-answered'>
                                    <div className='row detail-question-answered-control'>
                                    <Markup content={props.content.posting_detail.html_content}/>
                                    </div>
                                </div>
                            </div>
                        </div>
        

                    <div className='row thumb-answered-control'>
                        <div className='col-md-6'>
                            
                        </div>
                        <div className='col-md-3'>

                        </div>
                        <div className='col-md-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    
                                </div>
                                <div className='col-md-4'>
                                    
                                </div>
                                {(props.likeAnswer === true)?
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeAnswer:false})} style={{width:'100%'}} src={like} alt="img"/>{props.content.posting_detail.point+1}
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeAnswer:true})} style={{width:'100%'}} src={havelike} alt="img"/>{props.content.posting_detail.point}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    } else if (props.menuBarUser ==='Reputasi' || props.typeContent ==='reputation') {
        return (
            <div className='container own-article'>
                <div className='row'>
                    <div className='col-md-12 box-control-reputation bg-white'>
                        <div className='row'>
                            <div className='col-md-2' style={{paddingLeft:'0'}}>
                                <img className='language-reputation' src={examplelang} alt="img"/>
                            </div>
                            <div className='col-md-3 detail-reputation'>
                                <div className='lang-point'>Python (125)</div>
                                <ul>
                                    <li>Jawaban (25)</li>
                                    <li>Artikel (15)</li>
                                </ul>
                            </div>
                            <div className='col-md-4 detail-level'>
                                <div className='lang-level'>Code Master</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <span></span>
        )
    }
}

export default connect("menuBarUser, likeArticle, likeQuestion, likeAnswer, isLoading",actions)(withRouter(UserOwnFile));