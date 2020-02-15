import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import TextArea from '../components/textArea'; 
import PreviewArticle from '../components/previewArticle';

class AddArticlePage extends React.Component {
    /**
	 * @function doSearch() send user to searching result page
	 */
    doSearch = () => {
        this.props.history.push('/pencarian')
      }

    /**
	 * @function handleUploadArticle() handle upload article and send user to article page
	 */
    handleUploadArticle = () => {
        this.props.uploadArticle()
        this.props.history.push('/artikel')
    }
    
	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch}/>
				<div className="container-fluid" style={{paddingTop:'100px'}}>
					<div className='row'>
                        <div className='col-md-6'>
                            <TextArea/>
                            <div className='row button-area-control'>
                                <div className='col-md-4'>
                                </div>
                                <div className='col-md-4'>
                                    {this.props.newArticle === '' || this.props.articleTitle === ''?
                                        <button disabled className='btn btn-grad' style={{marginBottom:'50px', fontSize:'15px',padding:'15px'}}>Unggah Artikel</button>
                                    :
                                        <button className='btn btn-grad' style={{marginBottom:'50px', fontSize:'15px',padding:'15px'}} onClick={()=>this.handleUploadArticle()}>Unggah Artikel</button>
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
export default connect('menuBarUpload, articleTitle, newArticle', actions)(withRouter(AddArticlePage));
