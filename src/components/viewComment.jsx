import React from 'react';
import '../styles/css/userownarticle.css';
import '../styles/css/materialIcons.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import { Helmet } from 'react-helmet';
import user from '../images/user.png';
import Loader from './loader'
import like from '../images/like.png';
import havelike from '../images/have-like.png';
import Moment from 'react-moment';

const ViewComment = (props) => {
  if(props.allArticleDatabase === {} || props.isLoading){
    return (
      <div>
        <Loader/>
      </div>
    )
  } else {
    let allComment = props.allArticleDatabase.second_data.second_detail_list
    return (
      <div>
        {allComment.map((comment, index)=> 
        <div style={{textAlign:'left', marginBottom:'20px'}}>
          <Helmet>
            <meta name="description" content={comment.posting_detail.html_content} />
          </Helmet>
          {comment.posting_detail.content_status !== 2?
            <div className='container-fluid user-comment-control'>
              <div className='row'>
                <div className='col-md-2 '>
                  <div className='col-md-12 control-comment-user text-center'>
                    {comment.user_data.photo_url === "null"?
                      <div>
                        <img className='writer-photo-comment mr-0' width='30%' src={user} alt=''/>
                      </div>
                    :
                      <div>
                        <img className='writer-photo-comment mr-0' width='30%' src={comment.user_data.photo_url} alt='' style={{height:'46px', width:'46px'}}/>
                      </div>
                    }
                  <div className='col-md-12 control-comment-user text-center'>
                    <Link onClick={()=>props.getProfile(comment.posting_detail.user_id, comment.user_data.username)} style={{textDecoration: 'none', color:'#385898', fontSize:'12px'}}>{comment.user_data.username}</Link>
                  </div>
                  </div>
                  <div className='col-md-12 control-comment-user time-article-comment-control text-center'>
                    <Moment fromNow ago>{comment.posting_detail.created_at}</Moment> ago
                  </div>
                </div>
                <div></div>
                <div className='col-md-10'>
                  <div className='col-md-12 box-comment-control'>
                      <div className='preview-comment-control'>
                        <Markup className='preview-article-control' content={comment.posting_detail.html_content}/>
                      </div>
                      {comment.posting_detail.content_type === 'answer' ? 
                        <div className="row" style={{paddingTop:'10px'}}>
                        <div className="text-right mt-2 col-md-7"></div>
                        <div className="text-right mt-2 col-md-2 ml-5">
                          {comment.user_data.username === localStorage.getItem('username')?
                          <Link onClick={()=>props.handleDeleteAnswer(comment.posting_detail)} style={{textDecoration:'none', paddingRight:'0px'}}>
                            <i className="material-icons" style={{fontSize:'28px'}}>delete</i>
                          </Link>
                          :
                          <span></span>
                          }
                        </div>
                        <div className="text-right mt-2 col-md-1 ml-5">
                          {props.slLikeList.includes(comment.posting_detail.id)?
                            <div className="text-center">
                              <Link onClick={()=>props.likePosting(comment.posting_detail.id, 'answer')} style={{color:'black'}}><i id={comment.posting_detail.id}className="material-icons">thumb_up</i></Link>
                              <div id={'point'+comment.posting_detail.id}>
                                {comment.posting_detail.point}
                              </div>
                            </div>
                            :
                            <div className="text-center">
                              <Link onClick={()=>props.likePosting(comment.posting_detail.id, 'answer')} style={{color:'black'}}><i id={comment.posting_detail.id}className="material-icons-outlined">thumb_up</i></Link>
                              <div id={'point'+comment.posting_detail.id}>
                                {comment.posting_detail.point}
                              </div>
                            </div>
                          }
                          
                        </div>
                        </div>
                      : 
                      <div className='row'>
                        <div className='col-md-10'>
                        </div>
                        <div className='col-md-2' style={{marginTop:'10px', marginBottom:'-10px'}}>
                          {comment.user_data.username === localStorage.getItem('username')?
                          <Link onClick={()=>props.handleDeleteAnswer(comment.posting_detail)} style={{textDecoration:'none', paddingRight:'0px'}}>
                            <i className="material-icons" style={{fontSize:'28px'}}>delete</i>
                          </Link>
                          :
                          <span></span>
                          }
                        </div>
                      </div>
                      }
                  </div>
                </div>
              </div>
            </div>
          :
            null
          }
        </div>
        )}
      </div>
    )
  }
}

export default connect("newArticle, isLoading, articleTitle, allArticleDatabase, imageUrl, likeAnswer",actions)(withRouter(ViewComment));
