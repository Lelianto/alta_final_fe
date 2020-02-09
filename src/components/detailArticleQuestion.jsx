import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Markup } from 'interweave';
import user from '../images/user.png';
import Loader from './loader';

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
            <title>{contentNew.posting_data.posting_detail.title}</title>
            <meta name="description" content={htmlArticle} />
          </Helmet>
          <div className='col-md-12 box-control'>
            <div style={{fontWeight:'Bold', fontSize:'25px', marginBottom:'10px'}}>{contentNew.posting_data.posting_detail.title}</div>
                <div className='row text-control'>
                  <div className='col-md-4 username-control'>
                      <img className='writer-photo' src={user} alt=""/>
                      <Link style={{textDecoration: 'none', color:'#385898'}}>{contentNew.posting_data.user_data.username}</Link>
                  </div>
                  <div className='col-md-5'>
                      
                  </div>
                  <div className='col-md-3 time-article-control'>
                      {contentNew.posting_data.posting_detail.created_at}
                  </div>
              </div>
              <div>
                <img style={{width:'100%', marginTop:'10px', marginBottom:'20px'}} src={contentNew.posting_data.posting_detail.banner_photo_url} alt=""/>
              </div>
              <div className='preview-article-control'>
                {htmlArticle}
              </div>
          </div>
        </div>
      )
    }
}

export default connect("newArticle, baseUrl isLoading, articleTitle, imageUrl,allArticleDatabase",actions)(withRouter(DetailArticleQuestion));
