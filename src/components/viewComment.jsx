import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import { Helmet } from 'react-helmet';
import user from '../images/user.png';
import Loader from './loader'

class ViewComment extends React.Component {
  render() {
    if(this.props.allArticleDatabase === {} || this.props.isLoading){
      return (
        <div>
          <Loader/>
        </div>
      )
    } else {
      let allComment = this.props.allArticleDatabase.second_data.second_detail_list
      console.log('isi apapun',allComment)
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
                        <img className='writer-photo-comment' width='30%' src={user} alt=""/>
                      </div>
                    :
                      <div>
                        <img className='writer-photo-comment' width='30%' src={comment.user_data.photo_url} alt="" />
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
}

export default connect("newArticle, isLoading, articleTitle, allArticleDatabase, imageUrl",actions)(withRouter(ViewComment));
