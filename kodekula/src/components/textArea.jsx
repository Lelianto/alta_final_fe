import React from 'react';
import '../styles/css/textArea.css'
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { storage } from '../firebase'

const listTags = ['reactjs','python','mysql']
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
        this.state = {
            tagging : [],
            taggingList : []
        }
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

    controlTag = async (event) => {
        console.log(event.target.checked)
        let taggingList = this.state.taggingList
        taggingList['checked'] =event.target.checked
        this.setState({taggingList:taggingList})
        if(event.target.checked){
            await this.state.tagging.push(event.target.value)
        } else {
            const newTags = this.state.tagging.filter(item => item !== event.target.value)
            await this.setState({tagging:newTags})
        }
        await console.log('isi tag list',this.state.taggingList)
    } 
    
    render() {
        const addedTag = this.state.tagging
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
                    {addedTag.length > 0 ?
                        <div className='row'>
                            <div className='col-md-3' style={{fontSize:'15px', marginTop:'10px'}}>
                                Tag Terpilih
                            </div>
                            <div className='col-md-9'>
                                <div className='row'>
                                    {addedTag.map((tag,i)=>
                                    <div className='col-md-3'>
                                        <div className='control-choosen-tag'>
                                            {tag}
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    :
                    <span></span>}
                    <div className='row'>
                        <div className='col-md-3' style={{marginTop:'10px'}}>
                            <div class="btn-group dropright">
                                <button style={{fontSize:'15px'}} type="button" class="btn btn-secondary">
                                    Pilih Tag Tulisan
                                </button>
                                <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="sr-only">Toggle Dropright</span>
                                </button>
                                <div className='dropdown-control'>
                                    <div className=''>
                                        <div class="row control-width dropdown-menu">
                                            <div className='col-md-12'>
                                                <div className='row'>
                                                    {listTags.map((tag)=>
                                                        <div className='col-md-4 text-center background-tag-control'>
                                                        <div style={{fontSize:'12px', textDecoration:'none'}} class="dropdown-item1" to="#"><input type="checkbox" onClick={(event)=>this.controlTag(event)} name="code" value={tag}/>{tag}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                            </div>
                                            <div className='col-md-4'>
                                            </div>
                                        </div>
                                    </div>
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
                            <button style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn-outline-info' className='btn btn-info' type='file' onClick={()=>this.uploadPhoto()}>Upload</button>
                        </div>
                    <div className="col-sm-4">
                        <Link style={{textDecoration:'none'}} className='link-button-text-area'>
                            <div className='button-text-area'>
                                Upload Gambar Artikel
                            </div>
                        </Link>
                    </div>
                    <div className='col-md-4'>
                        <input style={{fontSize:'12px', paddingRight:'0', width:'194px'}} className='btn-outline-info' type='file' onChange={()=>this.fileSelectedHandler()}/>
                    </div>
                    <div className='col-md-4'>
                        <button className='btn' style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info' onClick={()=>this.uploadArticlePhoto()}>Upload</button>
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

export default connect('selectedFile, tagWritings, menuBarUpload, imageArticleUrl, newArticle, imageArticle, imageUrl, listCode, wordCode', actions)(withRouter(TextArea));