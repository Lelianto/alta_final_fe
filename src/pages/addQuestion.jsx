import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import TextArea from '../components/textArea'; 
import PreviewArticle from '../components/previewArticle';

class AddQuestionPage extends React.Component {
    /**
	 * @function doSearch() send user to searching result page
	 */
    doSearch = () => {
        this.props.history.push('/pencarian')
      }
    
    /**
	 * @function handleUploadQuestion() handle upload question and send user to question page
	 */
    handleUploadQuestion = () => {
        this.props.uploadQuestion()
        this.props.history.push('/pertanyaan')
    }

	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch}/>
				<div className="container-fluid" style={{paddingTop:'100px'}}>
					<div className='row'>
                        <div className='col-md-6'>
                            <TextArea typeText='Masukkan Judul Pertanyaan'/>
                            <div className='row button-area-control'>
                                <div className='col-md-4'>
                                </div>
                                <div className='col-md-4'>
                                    {this.props.newArticle === '' || this.props.articleTitle === ''|| this.props.tags === [] || this.props.tags.length === 0?
                                        <button disabled className='btn btn-grad' style={{marginBottom:'50px', fontSize:'15px',padding:'15px'}}>Unggah Pertanyaan</button>
                                    :
                                        <button className='btn btn-grad' style={{marginBottom:'50px', fontSize:'15px',padding:'15px'}} onClick={()=>this.handleUploadQuestion()}>Unggah Pertanyaan</button>
                                    }
                                </div>
                                <div className='col-md-4'>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <PreviewArticle/>
                        </div>
                    </div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect('menuBarUpload ,newArticle ,articleTitle, tags, codeCompilerResult', actions)(withRouter(AddQuestionPage));
