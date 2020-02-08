import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import TextArea from '../components/textArea'; 
import PreviewArticle from '../components/previewArticle';
import Loader from '../components/loader';
import axios from 'axios'

class EditQuestionPage extends React.Component {
    componentWillMount = async () => {
        console.log('id param', this.props.match.params.id)
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
                questionId:questionIdParam,
                firstData:response.data.posting_data.posting_detail.html_content,
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
        if(store.getState().isLoading){
            return(
                <div>
                    <Loader/>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <Header />
                    <div className="container-fluid" style={{paddingTop:'100px'}}>
                        <div className='row'>
                        <div className='col-md-2'>
    
                        </div>
                            <div className='col-md-8'>
                                <TextArea typeText='Masukkan Judul Pertanyaan'/>
                                <div className='row button-area-control'>
                                    <div className='col-md-4'>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='btn btn-grad' style={{marginBottom:'50px', fontSize:'15px',padding:'15px'}} onClick={()=>this.props.updateQuestion()}>Edit / Perbarui Pertanyaan</div>
                                    </div>
                                    <div className='col-md-4'>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-2'>
    
                            </div>
                            {/* <div className='col-md-6'>
                                <PreviewArticle/>
                            </div> */}
                        </div>
                    </div>
                    <Footer />
                </React.Fragment>
            );
        }
	}
}
export default connect('menuBarUpload, codeCompilerResult, isLoading', actions)(withRouter(EditQuestionPage));
