import React from 'react';
import '../styles/css/userownarticle.css';
import { actions } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import user from '../images/user.png';

class PreviewComment extends React.Component {
  render() {
    let contentNew = this.props.newArticle
    const htmlArticle = <Markup className='preview-article-control' content={contentNew}/>
    return (
      <div style={{textAlign:'left', marginBottom:'20px'}}>
        <div className='container-fluid user-comment-control'>
          <div className='row'>
            <div className='col-md-3 '>
              <div className='col-md-12'>
                  <img className='writer-photo-comment' width='100%' src={user} alt=""/>
                  <div>
                    <Link style={{textDecoration: 'none', color:'#385898', fontSize:'12px'}}>Ini adalah User ID : 01</Link>
                  </div>
              </div>
              <div className='col-md-12 time-article-comment-control'>
                  05-02-2020
              </div>
            </div>
            <div className='col-md-9'>
              <div className='col-md-12 box-comment-control'>
                <div style={{textAlign:'center', fontWeight:'bold',marginTop:'15px',fontSize:'15px'}}>
                  Preview Komentar
                </div>
                  <div>
                    <img style={{width:'100%'}} src={this.props.imageUrl} alt=""/>
                  </div>
                  <div className='preview-comment-control'>
                    {htmlArticle}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect("newArticle, articleTitle, imageUrl",actions)(withRouter(PreviewComment));
