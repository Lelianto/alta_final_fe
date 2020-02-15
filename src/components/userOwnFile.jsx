import React from 'react';
import '../styles/css/userownarticle.css';
import '../styles/css/bootstrap.min.css';
import '../styles/css/materialIcons.css';
import user from '../images/user.png';
import more from '../images/ellipsis.png';
import eye from '../images/eye.png';
import like from '../images/like.png';
import havelike from '../images/have-like.png';
import comment from '../images/comment.png';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import Truncate from 'react-truncate'
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
                            {props.userDetail.user_id === postingDetail.user_id && postingDetail.content_status === 0 && store.getState().urlProfile === 'https://api.kodekula.com/users/me'?
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
                        <Moment add={{hours : 7}} fromNow>{postingDetail.created_at}</Moment>
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
                                    <img style={{width:'100%', marginBottom:'3px'}} src={eye} alt="img"/>{postingDetail.views}
                                </div>
                                {props.likeList.includes(postingDetail.id)?
                                    <div className='col-md-4'>
                                       <Link onClick={()=>props.likePosting(postingDetail.id, postingDetail.content_type)}  style={{color:'black'}}><i id={postingDetail.id} className="material-icons">thumb_up</i></Link>
                                        <span id={'point'+postingDetail.id}>{postingDetail.point}</span>
                                    </div>
                                   :
                                    <div className='col-md-4'>
                                        <Link onClick={()=>props.likePosting(postingDetail.id, postingDetail.content_type)}  style={{color:'black'}}><i id={postingDetail.id}className="material-icons-outlined">thumb_up</i></Link>
                                        <span id={'point'+postingDetail.id}>{postingDetail.point}</span>
                                    </div>
                                }
                                <div className='col-md-4'>
                                    <img style={{width:'100%', marginBottom:'3px'}} src={comment} alt="img"/>{postingDetail.sl_amount}
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
                        {props.userDetail.user_id === postingDetail.user_id && postingDetail.content_status === 0 && store.getState().urlProfile === 'https://api.kodekula.com/users/me' ?
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
                                {userData.photo_url !== null || userData.photo_url !== "null" ? 
                                    <img className='writer-photo' src={userData.photo_url} alt="" style={{height:'38px', width:'38px'}}/>
                                    :
                                    <img className='writer-photo' src={user} alt=""/>
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
                        <Moment add={{hours : 7}} fromNow>{postingDetail.created_at}</Moment>
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
                                    <img style={{width:'100%', marginBottom:'3px'}} src={eye} alt="img"/>{postingDetail.views}
                                </div>
                                {(props.likeList.includes(postingDetail.id))?
                                    <div className='col-md-4'>
                                        <Link onClick={()=>props.likePosting(postingDetail.id, postingDetail.content_type)} style={{color:'black'}}><i id={postingDetail.id}className="material-icons">thumb_up</i></Link>
                                        <span id={'point'+postingDetail.id}>{postingDetail.point}</span>
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <Link onClick={()=>props.likePosting(postingDetail.id, postingDetail.content_type)} style={{color:'black'}}><i id={postingDetail.id} className="material-icons-outlined">thumb_up</i></Link>
                                        <span id={'point'+postingDetail.id}>{postingDetail.point}</span>
                                    </div>
                                }
                                <div className='col-md-4'>
                                    <img style={{width:'100%', marginBottom:'3px'}} src={comment} alt="img"/>{postingDetail.sl_amount}
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
                                {(props.likeList.includes(props.content.posting_detail.id))?
                                    <div className='col-md-4'>
                                        <Link onClick={()=>props.likePosting(props.content.posting_detail.id, props.content.posting_detail.content_type)} style={{color:'black'}}><i id={props.content.posting_detail.id}className="material-icons">thumb_up</i></Link>
                                        <span id={'point'+props.content.posting_detail.id}>{props.content.posting_detail.point}</span>
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <Link onClick={()=>props.likePosting(props.content.posting_detail.id, props.content.posting_detail.content_type)} style={{color:'black'}}><i id={props.content.posting_detail.id} className="material-icons-outlined">thumb_up</i></Link>
                                        <span id={'point'+props.content.posting_detail.id}>{props.content.posting_detail.point}</span>
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
                    {props.reputation.map(tag => (
                    <div className='col-md-12 box-control-reputation bg-white mb-4'>
                        <div className='row'>
                            <div className='col-md-2 pl-2 py-2 pr-2 border' style={{paddingLeft:'0'}}>
                                <img className='language-reputation bg-white' src={tag.photo_url} alt=""/>
                            </div>
                                <div className='col-md-3 detail-reputation'>
                                    <div className='lang-point'>{tag.tag_name} ({tag.point})</div>
                                    <ul>
                                        <li>Jawaban ({tag.answer})</li>
                                        <li>Artikel ({tag.article})</li>
                                    </ul>
                                </div>
                            <div className='col-md-4 detail-level'>
                            </div>
                        </div>
                    </div>
                    ))}
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