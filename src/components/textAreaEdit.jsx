import React from 'react';
import '../styles/css/textArea.css'
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { storage } from '../firebase'
import { Markup } from 'interweave';
import axios from 'axios';

class TextAreaEdit extends React.Component {
    constructor(props){
        super(props);
        this.escFunction = this.escFunction.bind(this);
        this.state = {
            tagging : this.props.allArticleDatabase.posting_data.posting_detail.tags,
            articleTitle : this.props.allArticleDatabase.posting_data.posting_detail.title,
            taggingList : [],
            search : '',
            searchList : []
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
        store.setState({
            articleTitle : this.props.allArticleDatabase.posting_data.posting_detail.title
        })
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
                response.data.map((tag, i)=>{
                    let tagData = tag
                    tagData['index'] = i
                    if (this.state.tagging.includes(tag.name) === false) {
                        tagData['checked'] = false
                        this.state.taggingList.push(tagData)
                        this.state.searchList.push(tagData)
                    } else {
                        tagData['checked'] = true
                        this.state.taggingList.push(tagData)
                        this.state.searchList.push(tagData)
                    }
                })
			})
			.catch(async (error) => {
				await console.warn(error);
			});
	};

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    controlTag = async (event, index) => {
        let taggingList = this.state.taggingList
        taggingList[index]['checked'] = event.target.checked
        this.setState({taggingList : taggingList, searchList : taggingList})
        if(event.target.checked){
            await this.state.tagging.push(event.target.value)
            await store.setState({tags : this.state.tagging})
        } else {
            const newTags = this.state.tagging.filter(item => item !== event.target.value)
            await this.setState({tagging:newTags})
            await store.setState({tags : newTags})
        }
    } 

    searchTag = async (event) => {
        await this.setState({search : event.target.value})
        if (this.state.search.length > 0) {
          const searchData = this.state.taggingList.filter(item => item.name.toLowerCase().indexOf(this.state.search) > -1
          )
          await this.setState({searchList : searchData })
          
        } else {
          await this.setState({searchList : this.state.taggingList })
        }
    }

    setInput = async (e) => {
        const title = await e.target.value
        await this.setState({articleTitle : title})
        await store.setState({articleTitle : title})
    }

    render() {
        const addedTag = this.state.tagging
        const textAreaContent = this.props.allArticleDatabase.posting_data.posting_detail
        const htmlContent = <Markup content={textAreaContent.html_content}/>

        store.setState({
            lastArticleQuestion: htmlContent.props.content,
            articleId: textAreaContent.id,
            tags : addedTag
        })

        return (
            <div style={{marginBottom:'20px'}}>
                <div className='row'>
                    <div className="col-sm-12">
                        <form onSubmit={e => e.preventDefault()}>
                        {this.props.typeText==='Masukkan Judul Pertanyaan'?
                            <input type="text" onChange={this.setInput} className="form-control input-box" id="articleTitle" name="articleTitle" value={this.state.articleTitle} onClick={()=>store.setState({menuBarUpload:true})}/>
                            :
                            <input type="text" onChange={this.setInput} className="form-control input-box" id="articleTitle" name="articleTitle" value={this.state.articleTitle} onClick={()=>store.setState({menuBarUpload:true})}/>
                        }
                        </form>
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
                                                <span><input type="text" className="mb-2" placeholder=" cari..." name="search" onChange={(e)=>this.searchTag(e)}/></span>
                                                <div className='row'>
                                                    {this.state.searchList.map((tag)=>
                                                        <div className='col-md-3 text-left background-tag-control mb-2'>
                                                        <div style={{fontSize:'12px', textDecoration:'none'}} class="dropdown-item1" to="#">
                                                            <input type="checkbox" onClick={(event)=>this.controlTag(event, tag.index)} name="code" value={tag.name} checked={tag.checked}/>{tag.name}</div>
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
                            <button style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info' type='file' onClick={()=>this.uploadPhoto()}>Upload</button>
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
                        <button style={{fontSize:'12px', paddingRight:'0', width:'185px'}} className='btn btn-info' onClick={()=>this.uploadArticlePhoto()}>Upload</button>
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

export default connect('selectedFile, isLoading, tagWritings, menuBarUpload, imageArticleUrl, allArticleDatabase, newArticle, imageArticle, imageUrl, listCode, wordCode, tags, articleTitle, lastArticleQuestion', actions)(withRouter(TextAreaEdit));