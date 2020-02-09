import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import { Helmet } from 'react-helmet';
import user from '../images/user.png';
import Loader from './loader'
import like from '../images/like.png';
import havelike from '../images/have-like.png';

const ViewComment = (props) => {
  if(props.allArticleDatabase === {} || props.isLoading){
    return (
      <div>
        <Loader/>
      </div>
    )
  } else {
    console.warn('all database', props.allArticleDatabase)
    let allComment = props.allArticleDatabase.second_data.second_detail_list
    // const contentType = props.allArticleDatabase.posting_data.posting_detail.content_type
    
    return (
      <div>
        {allComment.map((comment, index)=>
        <div style={{textAlign:'left', marginBottom:'20px'}}>
          <Helmet>
            <title>{comment.user_data.username}</title>
            <meta name="description" content={comment.posting_detail.html_content} />
          </Helmet>
          <div className='container-fluid user-comment-control'>
            <div className='row'>
              <div className='col-md-2 '>
                <div className='col-md-12 control-comment-user'>
                  {comment.user_data.photo_url === "null"?
                    <div>
                      <img className='writer-photo-comment' width='30%' src={user} alt=''/>
                    </div>
                  :
                    <div>
                      <img className='writer-photo-comment' width='30%' src={comment.user_data.photo_url} alt='' />
                    </div>
                  }
                <div className='col-md-12 control-comment-user'>
                  <Link style={{textDecoration: 'none', color:'#385898', fontSize:'12px'}}>{comment.user_data.username}</Link>
                </div>
                </div>
                <div className='col-md-12 control-comment-user time-article-comment-control'>
                    {comment.posting_detail.created_at}
                </div>
              </div>
              <div></div>
              <div className='col-md-10'>
                <div className='col-md-12 box-comment-control'>
                    <div className='preview-comment-control'>
                      <Markup className='preview-article-control' content={comment.posting_detail.html_content}/>
                    </div>
                    {comment.posting_detail.content_type === 'answer' ? 
                      <div className="row">
                      <div className="text-right mt-2 col-md-10"></div>
                      <div className="text-right mt-2 col-md-1 ml-5">
                        {(props.likeAnswer === true)?
                          <div className="text-center">
                            <img onClick={()=>store.setState({likeAnswer:false})} style={{width:'120%'}} src={like} alt="img"/>
                            <div>
                              {comment.posting_detail.point+1}
                            </div>
                          </div>
                          :
                          <div className="text-center">
                            <img onClick={()=>store.setState({likeAnswer:true})} style={{width:'120%'}} src={havelike} alt="img"/>
                            <div>
                            {comment.posting_detail.point}
                            </div>
                          </div>
                        }
                      </div>
                      </div>
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  }
}

export default connect("newArticle, isLoading, articleTitle, allArticleDatabase, imageUrl, likeAnswer",actions)(withRouter(ViewComment));
