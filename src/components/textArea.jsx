import React from 'react';
import '../styles/css/textArea.css'
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { storage } from '../firebase'
import { Markup } from 'interweave';
import axios from 'axios';

class TextArea extends React.Component {
    constructor(props){
        super(props);
        this.escFunction = this.escFunction.bind(this);
        this.state = {
            tagging : [],
            taggingList : []
        }
    }
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
    
    onUpdate=(evt)=>{
        const newContent = evt.editor.getData();
        store.setState({
            lastArticleQuestion: newContent
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

    escFunction = (event) => {
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

    componentDidMount = () => {
        document.addEventListener("keydown", this.escFunction, false);
        this.getAllTags()
    }

    getAllTags = async () => {
		const tags = {
			method: 'get',
			url: store.getState().baseUrl+'/tags',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		await axios(tags)
			.then(async (response) => {
                response.data.map((tag)=>(
                    this.state.taggingList.push(tag.name)
                ))
			})
			.catch(async (error) => {
				await console.warn(error);
			});
	};

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    controlTag = async (event) => {
        let taggingList = this.state.taggingList
        taggingList['checked'] =event.target.checked
        this.setState({taggingList:taggingList})
        if(event.target.checked){
            await this.state.tagging.push(event.target.value)
            await store.setState({tags : this.state.tagging})
        } else {
            const newTags = this.state.tagging.filter(item => item !== event.target.value)
            await this.setState({tagging:newTags})
            await store.setState({tags : newTags})
        }
    } 
    
    render() {
        const addedTag = this.state.tagging
        if(store.getState().allArticleDatabase===null || this.props.match.path === '/pertanyaan/tulis' || this.props.match.path === '/artikel/tulis'){
            return (
                <div style={{marginBottom:'20px'}}>
                    <div className='row'>
                        <div className="col-sm-12">
                            {this.props.typeText==='Masukkan Judul Pertanyaan'?
                                <input data-toggle="tooltip" data-placement="bottom" title="Klik untuk memunculkan menu upload" type="text" onChange={(e)=>this.props.changeInput(e)} className="form-control input-box" onClick={()=>store.setState({menuBarUpload:true})} id="articleTitle" placeholder='Masukkan Judul Pertanyaan' name="articleTitle" required/>
                                :
                                <input data-toggle="tooltip" data-placement="bottom" title="Klik untuk memunculkan menu upload" type="text" onChange={(e)=>this.props.changeInput(e)} className="form-control input-box" onClick={()=>store.setState({menuBarUpload:true})} id="articleTitle" placeholder='Masukkan Judul Artikel' name="articleTitle" required/>
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
                                            <div className='control-choosen-tag text-left background-tag-control mb-2' style={{fontSize:'12px', color:'white'}}>
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
                                                        {this.state.taggingList.map((tag)=>
                                                            <div className='col-md-3 text-left background-tag-control mb-2'>
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
                                <div data-toggle="tooltip" data-placement="bottom" title="Sebagai Foto Utama" type='file' className='button-text-area'>
                                    Pilih Gambar Utama
                                </div>
                            </Link>
                        </div>
                            <div className='col-md-4'>
                                    <input style={{fontSize:'12px', paddingRight:'0', width:'194px'}} className='btn-outline-info' type='file' id="file" name="file" onChange={(event)=>this.fileSelectedHandler(event)}/>
                            </div>
                            <div className='col-md-4'>
                                {this.props.imageArticle===null?
                                    <button disabled style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn-outline-info' className='btn btn-info' type='file'>Upload</button>
                                :
                                    <button style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn-outline-info' className='btn btn-info' type='file' onClick={()=>this.uploadPhoto()}>Upload</button>
                                }
                            </div>
                        <div className="col-sm-4">
                            <Link style={{textDecoration:'none'}} className='link-button-text-area'>
                                <div data-toggle="tooltip" data-placement="bottom" title="Copy gambar yang tercetak" className='button-text-area'>
                                    Upload Gambar Artikel
                                </div>
                            </Link>
                        </div>
                        <div className='col-md-4'>
                            <input style={{fontSize:'12px', paddingRight:'0', width:'194px'}} className='btn-outline-info' type='file' onChange={(event)=>this.fileSelectedHandler(event)}/>
                        </div>
                        <div className='col-md-4'>
                            {this.props.imageArticle===null?
                                <button disabled className='btn' style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className="btn btn-info">Upload</button>
                            :
                                <button className='btn' style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info' onClick={()=>this.uploadArticlePhoto()}>Upload</button>
                            }
                        </div>
                        <div className="col-sm-4">
                            <Link data-toggle="tooltip" data-placement="bottom" title="Paste pada text area" style={{textDecoration:'none'}} className='link-button-text-area'>
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
                    </div>
                    :
                    <span></span>
                    }
                </div>
            )
        } else {
            const textAreaContent = this.props.allArticleDatabase.posting_data.posting_detail
            const htmlContent = <Markup content={textAreaContent.html_content}/>
            store.setState({
                lastArticleQuestion: htmlContent.props.content,
                articleTitle: textAreaContent.title,
                articleId: textAreaContent.id
            })
            return (
                <div style={{marginBottom:'20px'}}>
                    <div className='row'>
                        <div className="col-sm-12">
                            {this.props.typeText==='Masukkan Judul Pertanyaan'?
                                <input placeholder={textAreaContent.title} type="text" onChange={(e)=>this.props.changeInput(e)} className="form-control input-box" onClick={()=>store.setState({menuBarUpload:true})} id="articleTitle" name="judulartikel" required/>
                                :
                                <input placeholder={textAreaContent.title} type="text" onChange={(e)=>this.props.changeInput(e)} className="form-control input-box" onClick={()=>store.setState({menuBarUpload:true})} id="articleTitle" name="judulartikel" required/>
                            }
                        </div>
                    </div>
                    <CKEditor 
                        activeClass="p10" 
                        content={store.getState().lastArticleQuestion} 
                        events={{
                            "blur": this.onBlur,
                            "afterPaste": this.afterPaste,
                            "change": this.onUpdate
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
                                            <div className='control-choosen-tag text-left background-tag-control mb-2' style={{fontSize:'12px', color:'white'}}>
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
                                                        {this.state.taggingList.map((tag)=>
                                                            <div className='col-md-3 text-left background-tag-control mb-2'>
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
                                    <input style={{fontSize:'12px', paddingRight:'0', width:'194px'}} className='btn-outline-info' type='file' id="file" name="file" onChange={(event)=>this.fileSelectedHandler(event)}/>
                            </div>
                            <div className='col-md-4'>
                                {this.props.imageArticle===null?
                                    <button disabled style={{fontSize:'12px', paddingRight:'0', width:'185px'}}  className='btn btn-info' type='file'>Upload</button>
                                :
                                    <button style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info' type='file' onClick={()=>this.uploadPhoto()}>Upload</button>
                                }
                            </div>
                        <div className="col-sm-4">
                            <Link style={{textDecoration:'none'}} className='link-button-text-area'>
                                <div className='button-text-area'>
                                    Upload Gambar Artikel
                                </div>
                            </Link>
                        </div>
                        <div className='col-md-4'>
                            <input style={{fontSize:'12px', paddingRight:'0', width:'194px'}} className='btn-outline-info' type='file' onChange={(event)=>this.fileSelectedHandler(event)}/>
                        </div>
                        <div className='col-md-4'>
                            {this.props.imageArticle===null?
                                <button disabled style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info'>Upload</button>
                            :
                                <button style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info' onClick={()=>this.uploadArticlePhoto()}>Upload</button>
                            }
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
                    </div>
                    :
                    <span></span>
                    }
                </div>
            )
        }
    }
}

export default connect('selectedFile, isLoading, tagWritings, menuBarUpload, imageArticleUrl, allArticleDatabase, newArticle, imageArticle, imageUrl, listCode, wordCode', actions)(withRouter(TextArea));