import React from 'react';
import '../styles/css/textArea.css'
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';

class CommentArea extends React.Component {
    updateContent=(newContent)=> {
        store.setState({
            newArticle: newContent
        })
    }
    // checkPreviewComment = () => {
    //     store.setState({
    //         startComment:true
    //     })
    // }
    onChange=(evt)=>{
        const newContent = evt.editor.getData();
        store.setState({
            newArticle: newContent,
            startComment:true
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
                <div className='container'>
                    <button className='btn btn-grad'>
                        Kirim
                    </button>
                </div>
            </div>
        )
    }
}

export default connect('selectedFile, tagWritings, menuBarUpload, imageArticleUrl, newArticle, imageArticle, imageUrl, listCode, wordCode', actions)(withRouter(CommentArea));