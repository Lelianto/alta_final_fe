import React from 'react';
import '../styles/css/userownarticle.css';
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave';
import axios from 'axios';
import user from '../images/user.png';

class detailArticle extends React.Component {
  componentWillMount = async () => {
    const req = {
      method: "get",
      url: store.getState().baseUrl+"/posting/toplevel/"+this.props.match.params.id
    }; 
    const questionIdParam = this.props.match.params.id
    const self = this
    await axios(req)
        .then((response) => {
          console.log('isi respon detail',response.data.posting_data)
          store.setState({ 
            allArticleDatabase: response.data, 
            isLoading:false,
            questionId:questionIdParam
          })
          console.log('hasil detail ke store',store.getState().allArticleDatabase)
          return response
        })
        .catch((error)=>{
          console.log(error)
          store.setState({ 
            isLoading: false
          })
          switch (error.response.status) {
            case 401 :
                self.props.history.push('/login')
                break
            case 403 :
                self.props.history.push('/403')
                break
            case 404 :
                self.props.history.push('/404')
                break
            case 500 :
                self.props.history.push('/500')
                break
            default :
                break
          }
        })
      };
  render() {
    // let contentNew = this.props.allArticleDatabase;
    // console.log('isi content',contentNew)
    // console.log('masuk',this.props.isLoading)
    if(store.getState().isLoading || store.getState().allArticleDatabase === {}) {
      console.log('masuk',store.getState().isLoading)
      console.log('isi kosong', store.getState().allArticleDatabase)
      return (
        <div>Loading</div>
        )
      } else {
        let contentNew = this.props.allArticleDatabase;
        console.log('isi',this.props.allArticleDatabase)
        console.log('isi content benar',contentNew)
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
            </div>
          </div>
        )
      }
  }
}

export default connect("newArticle, baseUrl isLoading, articleTitle, imageUrl,allArticleDatabase",actions)(withRouter(detailArticle));
