import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter } from 'react-router-dom';
import { Markup } from 'interweave';
import Loader from '../components/loader'

class PreviewArticle extends React.Component {
  render() {
    let contentNew = this.props.newArticle
    const htmlArticle = <Markup className='preview-article-control' content={contentNew}/>
      return (
        <div style={{textAlign:'left', marginBottom:'20px'}}>
          <div className='col-md-12 box-control'>
            <div style={{textAlign:'center', fontWeight:'bold', marginBottom:'20px', marginTop:'20px', fontSize:'30px'}}>
              Preview
            </div>
            <div style={{fontWeight:'Bold', fontSize:'25px'}}>{this.props.articleTitle}</div>
              <div>
                <img style={{width:'100%'}} src={this.props.imageUrl}/>
              </div>
              <div className='preview-article-control'>
                {htmlArticle}
              </div>
          </div>
        </div>
      )
    } 
}

export default connect("newArticle, isLoading, articleTitle, imageUrl",actions)(withRouter(PreviewArticle));
