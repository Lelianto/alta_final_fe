import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import TextAreaEdit from '../components/textAreaEdit'; 
import Accordion from '../components/accordionExplain'
import PreviewArticle from '../components/previewArticle';
import axios from 'axios';
import Loader from '../components/loader'

class EditArticlePage extends React.Component {

    state = {
        textAreaLoading : true
    }
    
    doSearch = () => {
        this.props.history.push('/pencarian')
      }

    componentWillMount = async () => {
        const req = {
          method: "get",
          url: store.getState().baseUrl+"/posting/toplevel/"+this.props.match.params.id
        }; 
        const questionIdParam = this.props.match.params.id
        const self = this
        await axios(req)
            .then(async (response) => {
              await store.setState({ 
                allArticleDatabase: response.data, 
                isLoading:false,
                questionId:questionIdParam,
                firstData:response.data.posting_data.posting_detail.html_content,
              })
              await this.setState({textAreaLoading : false})

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
    handleEditArticle = async () => {
        await this.props.updateArticle()
        await this.props.history.push('/artikel/'+store.getState().articleId)
    }

	render() {
        if(store.getState().allArticleDatabase===null){
            return(
                <div>
                    <Loader/>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <Header doSearch={this.doSearch}/>
                    <div className="container-fluid" style={{paddingTop:'100px'}}>
                        <div className='row'>
                        <div className='col-md-2'>

                        </div>
                            <div className='col-md-8'>
                                {this.state.textAreaLoading === true ?
                                <div>
                                    <Loader/>
                                </div> :
                                    <TextAreaEdit/>
                                }
                                <div className='row button-area-control'>
                                    <div className='col-md-4'>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='btn btn-grad' style={{marginBottom:'50px', fontSize:'15px',padding:'15px'}} onClick={()=>this.handleEditArticle()}>Edit / Perbarui Artikel</div>
                                    </div>
                                    <div className='col-md-4'>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-2'>

                            </div>
                            {/* HARUSNYA PREVIEW TAPI MASIH ADA BUG */}
                            {/* <div className='col-md-6'>
                                <PreviewArticle/>
                            </div> */}
                            {/* <div className='col-md-6' style={{marginTop:'-20px'}}>
                                <Accordion/>
                            </div> */}
                        </div>
                    </div>
                    <Footer />
                </React.Fragment>
            );
        }
	}
}
export default connect('menuBarUpload, isLoading', actions)(withRouter(EditArticlePage));
