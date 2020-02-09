import React from 'react';
import '../styles/css/textArea.css'
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { storage } from '../firebase';

class CommentArea extends React.Component {
    updateContent=(newContent)=> {
        store.setState({
            newArticle: newContent
        })
    }

    onChange=(evt)=>{
        const newContent = evt.editor.getData();
        store.setState({
            newArticle: newContent,
            startComment:true
        })
    }

    fileSelectedHandler= async(event)=>{
        if(event.target.files[0]){
            store.setState({
                imageArticle:event.target.files[0]
            })
        }
    }

    uploadArticlePhoto =()=>{
        const image = store.getState().imageArticle
        const uploadPhotos = storage.ref(`images/${image.name}`).put(image);
        uploadPhotos.on('state_changed', 
        (snapshot) => {
            // Progress Function
        }, 
        (error) => {
            // Error Function
            console.log(error)
        }, 
        ()=>{
            // Complete Function
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                store.setState({
                    imageArticleUrl:url
                })
            })
        })
    }

    render() {
        return (
            <div style={{marginBottom:'20px'}}>
                <CKEditor 
                    activeClass="p10" 
                    content={this.props.newArticle} 
                    events={{
                        "blur": this.onBlur,
                        "afterPaste": this.afterPaste,
                        "change": this.onChange
                    }}
                />
                {this.props.startComment && this.props.newArticle !== ''?
                <div className='row' style={{marginBottom:'10px', marginTop:'10px'}}>
                    <div className="col-sm-4">
                        <Link style={{textDecoration:'none'}} className='link-button-text-area'>
                            <div className='button-text-area'>
                                Upload Gambar Artikel
                            </div>
                        </Link>
                    </div>
                    <div className='col-md-4'>
                        <input style={{fontSize:'12px', paddingRight:'0', width:'194px'}} className='btn-outline-info' type='file' onChange={this.fileSelectedHandler}/>
                    </div>
                    <div className='col-md-4'>
                        <button className='btn' style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className="btn btn-info" onClick={this.uploadArticlePhoto}>Upload</button>
                    </div>
                    <div className="col-sm-4">
                        <Link style={{textDecoration:'none'}} className='link-button-text-area'>
                            <div className='button-text-area'>
                                Link Gambar Artikel
                            </div>
                        </Link>
                    </div>
                    <div className="col-sm-8">
                        <div style={{textDecoration:'none', borderRadius:'5px'}} className='link-button-text-area'>
                            <div className='button-text-area'>
                                <img width='100px' height='100px' src={this.props.imageArticleUrl} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <span></span>}
                
                <div className='container'>
                    <button onClick={()=>this.props.handlePostComment()} className='btn btn-grad'>
                        Kirim
                    </button>
                </div>
            </div>
        )
    }
}

export default connect('selectedFile, tagWritings, menuBarUpload, imageArticleUrl, startComment, newArticle, imageArticle, imageUrl, listCode, wordCode', actions)(withRouter(CommentArea));