import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import axios from 'axios';
import user from '../images/user.png';
import Loader from './loader';
import eye from '../images/eye.png';
import like from '../images/like.png';
import havelike from '../images/have-like.png';
import comment from '../images/comment.png';

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
          <div className='col-md-12 box-control'>
            <div style={{fontWeight:'Bold', fontSize:'25px', marginBottom:'10px'}}>{contentNew.posting_data.posting_detail.title}</div>
                <div className='row text-control'>
                  <div className='col-md-4 username-control'>
                      <img className='writer-photo' src={user} alt="img"/>
                      <Link style={{textDecoration: 'none', color:'#385898'}}>{contentNew.posting_data.user_data.username}</Link>
                  </div>
                  <div className='col-md-5'>
                      
                  </div>
                  <div className='col-md-3 time-article-control'>
                      {contentNew.posting_data.posting_detail.created_at}
                  </div>
              </div>
              <div>
                <img style={{width:'100%', marginTop:'10px', marginBottom:'20px'}} src={contentNew.posting_data.posting_detail.banner_photo_url}/>
              </div>
              <div className='preview-article-control'>
                {htmlArticle}
              </div>
              <div className='row tag-control-article'>
                <div className='col-md-6'>
                    <div className='row text-center'>
                        <div className='col-md-3 tag-control-arc'>
                            #python
                        </div>
                        <div className='col-md-3 tag-control-arc'>
                            #flask
                        </div>
                        <div className='col-md-3 tag-control-arc'>
                            #restful
                        </div>
                        <div className='col-md-3 tag-control-arc'>
                            #pytest
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
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
