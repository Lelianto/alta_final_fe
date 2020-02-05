import React from 'react';
import '../styles/css/textArea.css'
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { storage } from '../firebase'
import axios from 'axios'

class TextArea extends React.Component {
    updateContent=(newContent)=> {
        store.setState({
            newArticle: newContent
        })
    }
  
    onChange=(evt)=>{
        const newContent = evt.editor.getData();
        store.setState({
            newArticle: newContent
        })
    }
  
    fileSelectedHandler= async(event)=>{
        if(event.target.files[0]){
            store.setState({
                imageArticle:event.target.files[0]
            })
        }
    }

    uploadPhoto =()=>{
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
                    imageUrl:url
                })
            })
        })
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

    constructor(props){
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }
    escFunction(event){
        if(event.keyCode === 13) {
            store.setState({
                wordCode: event.target.value + ';'
            })
        }
        else {
            store.setState({
                wordCode: event.target.value
            })
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() {
        return (
            <div style={{marginBottom:'20px'}}>
                <div className='row'>
                    <div className="col-sm-12">
                        {this.props.typeText==='Masukkan Judul Pertanyaan'?
                            <input type="text" onChange={(e)=>this.props.changeInput(e)} className="form-control input-box" onClick={()=>store.setState({menuBarUpload:true})} id="articleTitle" placeholder='Masukkan Judul Pertanyaan' name="judulartikel" required/>
                            :
                            <input type="text" onChange={(e)=>this.props.changeInput(e)} className="form-control input-box" onClick={()=>store.setState({menuBarUpload:true})} id="articleTitle" placeholder='Masukkan Judul Artikel' name="judulartikel" required/>
                        }
                    </div>
                </div>
                <CKEditor 
                    activeClass="p10" 
                    content={this.props.newArticle} 
                    events={{
                        "blur": this.onBlur,
                        "afterPaste": this.afterPaste,
                        "change": this.onChange
                    }}
                />
                {this.props.menuBarUpload===true?
                <div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div class="dropdown show">
                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{marginBottom:'10px', marginTop:'10px'}}>
                    <div onClick={this.fileUploadHandler} className="col-sm-4">
                        <Link style={{textDecoration:'none'}} className='link-button-text-area'>
                            <div type='file' className='button-text-area'>
                                Pilih Gambar Utama
                            </div>
                        </Link>
                    </div>
                        <div className='col-md-4'>
                                <input style={{fontSize:'12px', paddingRight:'0', width:'194px'}} className='btn-outline-info' type='file' id="file" name="file" onChange={this.fileSelectedHandler}/>
                        </div>
                        <div className='col-md-4'>
                            <button style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn-outline-info' className='btn btn-info' type='file' onClick={this.uploadPhoto}>Upload</button>
                        </div>
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
                        <button className='btn' style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info' onClick={this.uploadArticlePhoto}>Upload</button>
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
                                [ {this.props.imageUrl} ] 
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                :
                <span></span>
                }
            </div>
        )
    }
}

export default connect('selectedFile, menuBarUpload, imageArticleUrl, newArticle, imageArticle, imageUrl, listCode, wordCode', actions)(withRouter(TextArea));