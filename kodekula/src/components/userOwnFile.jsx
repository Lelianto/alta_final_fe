import React from 'react';
import '../styles/css/userownarticle.css';
import '../styles/css/bootstrap.min.css';
import user from '../images/user.png';
import more from '../images/ellipsis.png';
import eye from '../images/eye.png';
import like from '../images/like.png';
import havelike from '../images/have-like.png';
import comment from '../images/comment.png';
import examplelang from '../images/python-example.png'
import { actions, store } from '../stores/store';
import { connect } from 'unistore/react'
import { withRouter, Link } from 'react-router-dom';
import { Markup } from 'interweave'

const UserOwnFile = (props) => {
    console.log('isi konten', props.content)
    const userData = props.content.user_data
    const postingDetail = props.content.posting_detail
    console.log('isi posting detail',postingDetail)
    if (props.menuBarUser ==='Artikel' || props.typeContent ==='article') {
        return (
            <div className='container own-article mt-4'>
            <div className='row'>
                <div className='col-md-12 box-control bg-white'>
                    <div className='row text-control'>
                        <div className='col-md-11 title-article-control'>
                            {postingDetail.title} 
                        </div>
                        <div className='col-md-1 edit-control' id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className='logo-edit-control' src={more} alt="img"/>
                        </div>
                        <div class="dropdown-menu" style={{marginLeft:'-115px', marginTop:'-37px'}} aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#">Ubah/Perbarui</a>
                            <a class="dropdown-item" href="#">Hapus</a>
                        </div>
                    </div>
                    <div className='row text-control'>
                        <div className='col-md-4 username-control'>
                            <img className='writer-photo' src={user} alt="img"/>
                            <Link style={{textDecoration: 'none', color:'#385898'}}>{userData.username}</Link>
                        </div>
                        <div className='col-md-5'>
                            
                        </div>
                        <div className='col-md-3 time-article-control'>
                            {postingDetail.created_at}
                        </div>
                    </div>
                    <div className='row'>
                        {postingDetail.banner_photo_url !== null ? <img className='image-control' src={postingDetail.banner_photo_url} alt=""/> : null}
                    </div>
                    <div className='row detail-article-control'>
                        <Markup content={postingDetail.html_content}/>
                    </div>
                    <div className='row tag-control-article'>
                        <div className='col-md-6'>
                            <div className='row'>
                                <div className='col-md-3 tag-control-arc'>
                                    #python
                                </div>
                                <div className='col-md-3 tag-control-arc'>
                                    #flask
                                </div>
                                <div className='col-md-3 tag-control-arc'>
                                    #restful
                                </div>
                                <div className='col-md-3 tag-control-arc'>
                                    #pytest
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={eye} alt="img"/>{postingDetail.views}
                                </div>
                                {(props.likeArticle === true)?
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeArticle:false})} style={{width:'100%'}} src={like} alt="img"/>{postingDetail.point+1}
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeArticle:true})} style={{width:'100%'}} src={havelike} alt="img"/>{postingDetail.point}
                                    </div>
                                }
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={comment} alt="img"/> 5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-1'></div>
            </div>
        </div>
        )
    } else if (props.menuBarUser ==='Pertanyaan' || props.typeContent ==='question') {
        console.log('props di component', props)
        return (
            <div className='container own-article'>
            <div className='row'>
                <div className='col-md-12 box-control bg-white'>
                    <div className='row text-control'>
                        <Link onClick={()=>props.goToDetailQuestion(postingDetail.id)} className='col-md-11 title-article-control'>
                            {postingDetail.title}
                        </Link>
                        <div className='col-md-1 edit-control' id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className='logo-edit-control' src={more} alt="img"/>
                        </div>
                        <div class="dropdown-menu" style={{marginLeft:'-130px', marginTop:'-37px'}}  aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#">Ubah/Perbarui</a>
                            <a class="dropdown-item" href="#">Hapus</a>
                        </div>
                    </div>
                    <div className='row text-control'>
                        <div className='col-md-4 username-control'>
                            <img className='writer-photo' src={user} alt="img"/><Link style={{textDecoration: 'none', color:'#385898'}}>{userData.username}</Link>
                        </div>
                        <div className='col-md-5'>
                            
                        </div>
                        <div className='col-md-3 time-article-control'>
                            {postingDetail.created_at}
                        </div>
                    </div>
                    <div className='row detail-article-control'>
                        <Markup content={postingDetail.html_content}/>
                    </div>

                    <div className='row tag-control-article'>
                        <div className='col-md-6'>
                            <div className='row'>
                                <div className='col-md-3 tag-control-arc'>
                                    #python
                                </div>
                                <div className='col-md-3 tag-control-arc'>
                                    #flask
                                </div>
                                <div className='col-md-3 tag-control-arc'>
                                    #restful
                                </div>
                                <div className='col-md-3 tag-control-arc'>
                                    #pytest
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={eye} alt="img"/>{postingDetail.views}
                                </div>
                                {(props.likeQuestion === true)?
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeQuestion:false})} style={{width:'100%'}} src={like} alt="img"/> {postingDetail.point+1}
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeQuestion:true})} style={{width:'100%'}} src={havelike} alt="img"/> {postingDetail.point}
                                    </div>
                                }
                                <div className='col-md-4'>
                                    <img style={{width:'100%'}} src={comment} alt="img"/> 5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    } else if (props.menuBarUser ==='Jawaban') {
        return (
            <div className='container own-article'>
            <div className='row'>
                <div className='col-md-12 box-control bg-white'>
                    <div className='row text-control'>
                        <div className='col-md-11 detail-answer-control'>
                            Bagaimana cara menaklukan asyncronous Javascript?
                        </div>
                        <div className='col-md-1 edit-control' id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className='logo-edit-control' src={more} alt="img"/>
                        </div>
                        <div class="dropdown-menu" style={{marginLeft:'-130px', marginTop:'-27px'}} aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#">Ubah/Perbarui</a>
                            <a class="dropdown-item" href="#">Hapus</a>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='detail-answered-control'>
                            Jawaban
                        </div>
                    </div>
                    <p></p>
                        <div className='container own-article'>
                            <div className='row'>
                                <div className='col-md-12 box-control-answered'>
                                    <div className='row detail-question-answered-control'>
                                    Memahami asynchronus adalah salah satu hal penting dalam dunia Javascript. Topik ini sering dilewatkan ketika masih di tahap belajar fundamental mungkin karena konsepnya terlalu ribet dijelaskan atau alasan lain. Bahkan banyak yang sudah bertahun-tahun menggunakan javascript ternyata masih banyak yang masih kurang paham dengan konsep asynchronous. Walaupun secara praktek mungkin sudah sering digunakan.Ada banyak sekali implementasi asynchronous dalam javascript seperti event, timer, request ajax, listener, interaksi user dan masih banyak lagi. NodeJS merupakan salah satu contoh sukses platform javascript yang sangat bergantung pada teknik asynchronus.
                                    </div>
                                </div>
                            </div>
                        </div>
        

                    <div className='row thumb-answered-control'>
                        <div className='col-md-6'>
                            
                        </div>
                        <div className='col-md-3'>

                        </div>
                        <div className='col-md-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    
                                </div>
                                <div className='col-md-4'>
                                    
                                </div>
                                {(props.likeAnswer === true)?
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeAnswer:false})} style={{width:'100%'}} src={like} alt="img"/> 51
                                    </div>
                                    :
                                    <div className='col-md-4'>
                                        <img onClick={()=>store.setState({likeAnswer:true})} style={{width:'100%'}} src={havelike} alt="img"/> 50
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    } else if (props.menuBarUser ==='Reputasi') {
        return (
            <div className='container own-article'>
                <div className='row'>
                    <div className='col-md-12 box-control-reputation bg-white'>
                        <div className='row'>
                            <div className='col-md-2' style={{paddingLeft:'0'}}>
                                <img className='language-reputation' src={examplelang} alt="img"/>
                            </div>
                            <div className='col-md-3 detail-reputation'>
                                <div className='lang-point'>Python (125)</div>
                                <ul>
                                    <li>Jawaban (25)</li>
                                    <li>Artikel (15)</li>
                                </ul>
                            </div>
                            <div className='col-md-4 detail-level'>
                                <div className='lang-level'>Code Master</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <span></span>
        )
    }
}

export default connect("menuBarUser, likeArticle, likeQuestion, likeAnswer",actions)(withRouter(UserOwnFile));