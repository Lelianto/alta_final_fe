import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Markup } from 'interweave';
import user from '../images/user.png';
import Loader from './loader';
import eye from '../images/eye.png';
import like from '../images/like.png';
import havelike from '../images/have-like.png';
import comment from '../images/comment.png';
import more from '../images/ellipsis.png';
import Moment from 'react-moment';

const DetailArticleQuestion =(props)=> {
  if(store.getState().isLoading || store.getState().allArticleDatabase === {}) {
    return (
      <div><Loader/></div>
      )
    } else {
      let contentNew = props.allArticleDatabase;
      const postingDetail = contentNew.posting_data.posting_detail
      const htmlArticle = <Markup className='preview-article-control' content={contentNew.posting_data.posting_detail.html_content}/>
      return (
        <div style={{textAlign:'left', marginBottom:'20px', marginTop:'25px'}}>
          <Helmet>
            <meta name="description" content={htmlArticle} />
          </Helmet>
          <div className='row box-control'>
                <div className="col-md-11" style={{fontWeight:'Bold', fontSize:'25px', marginBottom:'10px'}}>{postingDetail.title}</div>
                { localStorage.getItem('username') !== null && localStorage.getItem('username') === contentNew.posting_data.user_data.username ?
                  <div>
                      <div className='col-md-1 edit-control' id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <img className='logo-edit-control' src={more} alt="img"/>
                      </div>
                      <div class="dropdown-menu" style={{marginLeft:'-130px', marginTop:'-37px'}}  aria-labelledby="dropdownMenuLink">
                        {postingDetail.content_type === 'question' ?
                          <div>
                            <Link class="dropdown-item" onClick={()=>props.editQuestion(postingDetail.id)} >Ubah/Perbarui</Link>
                            <Link onClick={()=>props.deleteQuestion(postingDetail)} class="dropdown-item" >Hapus</Link>
                          </div>
                        :
                          <div>
                            <Link class="dropdown-item" onClick={()=>props.editArticle(postingDetail.id)} >Ubah/Perbarui</Link>
                            <Link onClick={()=>props.deleteArticle(postingDetail)} class="dropdown-item" >Hapus</Link>
                          </div>
                        }
                      </div>
                  </div>
                  : null
                }
                <div className='row text-control'>
                  <div className='col-md-12 username-control' style={{paddingLeft:'34px'}}>
                            {contentNew.posting_data.user_data.photo_url !== null || contentNew.posting_data.user_data.photo_url !== "null" ? 
                                <img className='writer-photo' src={contentNew.posting_data.user_data.photo_url} alt="" style={{height:'38px', width:'38px'}}/>
                                :
                                <img className='writer-photo' src={user} alt=""/>
                            }
                      <Link onClick={()=>props.getProfile(postingDetail.user_id, contentNew.posting_data.user_data.username)} style={{textDecoration: 'none', color:'#385898'}}>{contentNew.posting_data.user_data.display_name}</Link>
                  </div>
                  <div className='col-md-5'>
                      
                  </div>
              </div>
              <div>
                <img style={{width:'100%', marginTop:'10px', marginBottom:'20px'}} src={postingDetail.banner_photo_url} alt=""/>
              </div>
              <div className='preview-article-control overflow col-md-12' style={{paddingLeft:'22px', overflow:'auto', height: 'auto'}}>
                {htmlArticle}
              </div>
              <div className='col-md-12 text-left pl-4 time-article-control'>
                  <Moment fromNow ago>{postingDetail.created_at}</Moment> ago
                  {postingDetail.updated_at !== null ? 
                    <React.Fragment>
                      &nbsp;&nbsp;&nbsp;&nbsp; Edited
                    </React.Fragment>
                    : null }
                  </div>
              <div className='row tag-control-article align-items-end'>
                <div className='col-md-8'>
                    <div className='row text-center ' style={{paddingLeft:'26px'}}>
                      {postingDetail.tags.map((tag)=>(
                          <div className='col-md-3 tag-control-arc'>
                              #{tag}
                          </div>
                      ))}
                    </div>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-3'>
                    <div className='row'>
                        <div className='col-md-4 text-center'>
                            <img style={{width:'100%'}} src={eye} alt="img"/>{postingDetail.views}
                        </div>
                        {props.likeList.includes(postingDetail.id)?
                            <div className='col-md-4 text-center'>
                                <Link onClick={()=>props.likePosting(postingDetail.id, postingDetail.content_type)} style={{color:'black'}}><i id={postingDetail.id}className="material-icons">thumb_up</i></Link>
                                <span id={'point'+postingDetail.id}>{postingDetail.point}</span>
                            </div>
                            :
                            <div className='col-md-4 text-center'>
                                <Link onClick={()=>props.likePosting(postingDetail.id, postingDetail.content_type)} style={{color:'black'}}><i id={postingDetail.id}className="material-icons-outlined">thumb_up</i></Link>
                                <span id={'point'+postingDetail.id}>{postingDetail.point}</span>
                            </div>
                        }
                        <div className='col-md-4 text-center'>
                            <img style={{width:'100%'}} src={comment} alt="img"/>{contentNew.second_data.second_info.sl_amount}
                        </div>
                    </div>
                </div>
                </div>
          </div>
        </div>
      )
    }
}

export default connect("newArticle, baseUrl isLoading, articleTitle, imageUrl,allArticleDatabase, likeArticle",actions)(withRouter(DetailArticleQuestion));
