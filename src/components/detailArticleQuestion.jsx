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
      const htmlArticle = <Markup className='preview-article-control' content={contentNew.posting_data.posting_detail.html_content}/>
      return (
        <div style={{textAlign:'left', marginBottom:'20px', marginTop:'25px'}}>
          <Helmet>
            {/* <title>{contentNew.posting_data.posting_detail.title}</title> */}
            <meta name="description" content={htmlArticle} />
          </Helmet>
          <div className='row box-control'>
                <div className="col-md-11" style={{fontWeight:'Bold', fontSize:'25px', marginBottom:'10px'}}>{contentNew.posting_data.posting_detail.title}</div>
                { localStorage.getItem('username') !== null && localStorage.getItem('username') === contentNew.posting_data.user_data.username ?
                  <div>
                      <div className='col-md-1 edit-control' id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <img className='logo-edit-control' src={more} alt="img"/>
                      </div>
                      <div class="dropdown-menu" style={{marginLeft:'-130px', marginTop:'-37px'}}  aria-labelledby="dropdownMenuLink">
                        {contentNew.posting_data.posting_detail.content_type === 'question' ?
                          <div>
                            <Link class="dropdown-item" onClick={()=>props.editQuestion(contentNew.posting_data.posting_detail.id)} >Ubah/Perbarui</Link>
                            <Link onClick={()=>props.deleteQuestion(contentNew.posting_data.posting_detail)} class="dropdown-item" >Hapus</Link>
                          </div>
                        :
                          <div>
                            <Link class="dropdown-item" onClick={()=>props.editArticle(contentNew.posting_data.posting_detail.id)} >Ubah/Perbarui</Link>
                            <Link onClick={()=>props.deleteArticle(contentNew.posting_data.posting_detail)} class="dropdown-item" >Hapus</Link>
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
                      <Link onClick={()=>props.getProfile(contentNew.posting_data.posting_detail.user_id, contentNew.posting_data.user_data.username)} style={{textDecoration: 'none', color:'#385898'}}>{contentNew.posting_data.user_data.display_name}</Link>
                  </div>
                  <div className='col-md-5'>
                      
                  </div>
              </div>
              <div>
                <img style={{width:'100%', marginTop:'10px', marginBottom:'20px'}} src={contentNew.posting_data.posting_detail.banner_photo_url} alt=""/>
              </div>
              <div className='preview-article-control overflow col-md-12' style={{paddingLeft:'22px', overflow:'auto', height: 'auto'}}>
                {htmlArticle}
              </div>
              <div className='col-md-12 text-left pl-4 time-article-control'>
                  <Moment fromNow ago>{contentNew.posting_data.posting_detail.created_at}</Moment> ago
                  {contentNew.posting_data.posting_detail.updated_at !== null ? 
                    <React.Fragment>
                      &nbsp;&nbsp;&nbsp;&nbsp; Edited
                    </React.Fragment>
                    : null }
                  </div>
              <div className='row tag-control-article align-items-end'>
                <div className='col-md-8'>
                    <div className='row text-center ' style={{paddingLeft:'26px'}}>
                      {contentNew.posting_data.posting_detail.tags.map((tag)=>(
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
                            <img style={{width:'100%'}} src={eye} alt="img"/>{contentNew.posting_data.posting_detail.views}
                        </div>
                        {(props.likeArticle === true)?
                            <div className='col-md-4 text-center'>
                                <img onClick={()=>store.setState({likeArticle:false})} style={{width:'100%'}} src={like} alt="img"/> {contentNew.posting_data.posting_detail.point+1}
                            </div>
                            :
                            <div className='col-md-4 text-center'>
                                <img onClick={()=>store.setState({likeArticle:true})} style={{width:'100%'}} src={havelike} alt="img"/> {contentNew.posting_data.posting_detail.point}
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
