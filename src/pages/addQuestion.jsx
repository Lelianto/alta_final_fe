import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import TextArea from '../components/textArea'; 
import PreviewArticle from '../components/previewArticle';

class AddQuestionPage extends React.Component {

    doSearch = () => {
        this.props.history.push('/pencarian')
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
                                    <div className='btn btn-grad' style={{marginBottom:'50px', fontSize:'15px',padding:'15px'}} onClick={()=>this.props.uploadQuestion()}>Unggah Pertanyaan</div>
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
export default connect('menuBarUpload, codeCompilerResult', actions)(withRouter(AddQuestionPage));
