import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import TextArea from '../components/textArea'; 
import PreviewArticle from '../components/previewArticle';

class AddQuestionPage extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<div className="container-fluid" style={{paddingTop:'100px'}}>
					<div className='row'>
                        <div className='col-md-6'>
                            <TextArea typeText='Masukkan Judul Pertanyaan'/>
                            <div>Result: {store.getState().codeCompilerResult}</div>
                            <div className='row button-area-control'>
                                <div className='col-md-4'>
                                </div>
                                <div className='col-md-4'>
                                    <button style={{marginBottom:'50px'}} className='btn btn-outline-success' onClick={()=>this.props.uploadQuestion()}>Unggah Pertanyaan</button>
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
