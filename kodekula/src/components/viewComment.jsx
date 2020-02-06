import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import user from '../images/user.png';

class ViewComment extends React.Component {
  render() {
    if(store.getState().allArticleDatabase === {} || store.getState().isLoading){
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      let allComment = this.props.allArticleDatabase.second_data.second_detail_list
      console.log('isi apapun',allComment)
      return (
        <div>
          {allComment.map((comment, index)=>
          <div style={{textAlign:'left', marginBottom:'20px'}}>
            <div className='container-fluid user-comment-control'>
              <div className='row'>
                <div className='col-md-2 '>
                  <div className='col-md-6 control-comment-user'>
                    {comment.user_data.photo_url === "null"?
                      <div>
                        <img className='writer-photo-comment' width='100%' src={user} alt=''/>
                      </div>
                    :
                      <div>
                        <img className='writer-photo-comment' width='100%' src={comment.user_data.photo_url} alt='' />
                      </div>
                    }
                  <div className='col-md-6 control-comment-user'>
                    <Link style={{textDecoration: 'none', color:'#385898', fontSize:'12px'}}>{comment.user_data.username}</Link>
                  </div>
                  </div>
                  <div className='col-md-12 control-comment-user time-article-comment-control'>
                      {comment.posting_detail.created_at}
                  </div>
                </div>
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
