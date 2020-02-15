import React from 'react';
import '../styles/css/articlePage.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import PopularList from '../components/popularList';
import AccessDetailArticle from '../components/detailArticleQuestion';
import Loader from '../components/loader';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import user from '../images/user.png';
import ViewComment from '../components/viewComment';
import Accordion from '../components/accordionExplain'

class DetailArticle extends React.Component {
	state = {
        comment : '',
        likeList : [],
        likeListLoading : true,
        contentLoading : true
    };

    /**
	 * @function getAllFirst() get all detail data
	 */
    getAllFirst = ()=>{
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/posting/toplevel/"+this.props.match.params.id
        }; 
        const questionIdParam = this.props.match.params.id
        const self = this
        axios(req)
            .then(async (response) => {
                await store.setState({ 
                allArticleDatabase: response.data, 
                isLoading:false,
                questionId:questionIdParam
                })
                await self.setState({
                    comment:'',
                    contentLoading : false
                })
                return response
            })
            .catch((error)=>{
                store.setState({ 
                isLoading: false
                })
                switch (error.response.status) {
					case 401 :
						self.props.history.push('/401')
						break
					case 403 :
						self.props.history.push('/403')
						break
					case 404 :
						self.props.history.push('/404')
						break
					case 422 :
						self.props.history.push('/422')
						break
					case 500 :
						self.props.history.push('/500')
						break
					default :
						break
				}
            })
    }
    
    /**
	 * @function changeState() change state comment content
	 */
    changeState = async (event) => {
        await this.setState({comment : event.target.value})
    }

    /**
	 * @function postComment() handle add comment in article
	 */
    postComment = async () => {
        const parameters = {
            "content_type" : 'comment',
            "html_content" : this.state.comment
        };
        const comment = await {
            method: "post",
            url: this.props.baseUrl + '/posting/secondlevel/' + this.props.questionId,
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token')
            },
            data: parameters
        };
        await this.props.handleAPI(comment)
        if(this.state.comment!==''){
            this.setState({
                comment:''
            })
            await this.getAllFirst()
            await this.props.history.push('/artikel/'+this.props.questionId)
        } else {
            await this.getAllFirst()
            await this.props.history.push('/artikel/'+this.props.questionId)
        }
    }

    /**
	 * @function handleSeeComment() handle see and hide comment
	 */
    handleSeeComment=()=>{
		if(store.getState().seeComment){
			store.setState({
				seeComment:false
			})
		} else {
			store.setState({
				seeComment:true
			})
		}
    }
    
    /**
	 * @function doSearch() handling searching
	 */
    doSearch = () => {
        this.props.history.push('/pencarian')
    }
    
    /**
	 * @function componentWillMount() trigger for content of page
	 */
    componentWillMount = async () => {
        if (localStorage.getItem('token')!==null){
            this.getLikeList()
        }
        await this.getAllFirst()
        await this.props.getPopular();
    };

    /**
	 * @function editArticle() handling edit article 
	 */
    editArticle = async (event) => {
        await store.setState({
            userId: event
        });
        await this.props.history.push('/artikel/' + event + '/edit');
    };

    /**
	 * @function deleteArticle() handling soft deleting article
	 */
	deleteArticle = async (event)=> {
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delArticle()
        await this.props.history.push('/')
	}

    /**
	 * @function getProfile() handling get user profile 
	 */
	getProfile = async (id, username) => {
		await store.setState({
			urlProfile : store.getState().baseUrl+'/users/'+id,
			uname : username
		})
		await this.props.history.push('/profil/'+username+'/pertanyaan')
    }
    
    /**
	 * @function detailArticle() go to detail article page
	 */
    detailArticle = async (event) => {
		await store.setState({
			userId: event
		});
		await this.props.history.push('/artikel/' + event);
    };
    
    /**
	 * @function goToDetailQuestion() go to detail question page
	 */
    goToDetailQuestion = async (event) => {
		store.setState({
			userId: event
		});
		await this.props.history.push('/pertanyaan/' + event);
    };
    
    getLikeList = async () => {
        const postId = []
		const like = {
			method: 'get',
			url: store.getState().baseUrl+'/point',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')

			}
		};
		const likeListRes = await axios(like)
		await likeListRes.data.map(async like => {
			if (like.content_type === 'article' && like.deleted === false) {
				await postId.push(like.locator_id)
			}
		})
		await this.setState({likeList : postId, likeListLoading : false})
	}

    /**
	 * @function handleDeleteAnswer() handle soft delete answer
	 */
    handleDeleteAnswer = async (event) => {
		await store.setState({
			idComment:event.id,
			htmlContent:event.html_content
		})
		await this.props.delComment()
		await this.getAllFirst()
		await this.props.history.push('/pertanyaan/'+this.props.match.params.id)
	}

	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch}/>
				<div className="container-fluid pt-4">
                    <Helmet>
                        <meta name="description" content="Berisi artikel yang membahas tentang pemrograman" />
                    </Helmet>
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-1 col-md-1 col-sm-12 col-12 mt-5">
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow" >
                            {!this.state.contentLoading && !this.likeListLoading ?
                            <React.Fragment>
                            <AccessDetailArticle 
                                editArticle={(e)=>this.editArticle(e)}
                                deleteArticle={(e)=>this.deleteArticle(e)} 
                                getProfile={this.getProfile}
                                likeList={this.state.likeList}
                                />
                                {store.getState().seeComment ?
                                <div>
                                    <button className='btn btn-grad' onClick={()=>this.handleSeeComment()} style={{textAlign:'center', marginBottom:'20px', fontWeight:'bold', fontSize:'15px'}}>
                                        Lihat Komentar...
                                    </button>
                                </div>
                                :
                                <div>
                                    <button className='btn btn-grad' onClick={()=>this.handleSeeComment()} style={{textAlign:'center', marginBottom:'20px', fontWeight:'bold', fontSize:'15px'}}>
                                        Sembunyikan Komentar...
                                    </button>
                                        <ViewComment 
                                        handleDeleteAnswer={(event)=>this.handleDeleteAnswer(event)}/>
                                </div>
                                }
                                </React.Fragment> 
                                :
                                <div><Loader/></div>
                            }
                            {localStorage.getItem('username') !== null || localStorage.getItem('token') !== null?
                                <div className="border py-2 ml-1 mr-1 row bg-white">
                                    <div className="col-md-2">
                                        <img src={user} alt="" width="90%" style={{borderRadius : '50%'}}/>
                                    </div>
                                    <div className="col-md-8 form-group" style={{paddingTop:'18px'}}>
                                        <input type="text" className="form-control" placeholder="Tuliskan komentar anda" onChange={(e)=>this.changeState(e)}/>
                                    </div>
                                    {this.state.comment===''?
                                        <div className="col-md-2 text-center pt-3">
                                            <button disabled className="btn btn-outline-primary" style={{width:'100%'}}>Kirim</button>
                                        </div>
                                    :
                                        <div className="col-md-2 text-center pt-3">
                                            <button className="btn btn-outline-primary" style={{width:'100%'}} onClick={()=>this.postComment()}>Kirim</button>
                                        </div>
                                    }
                                </div>
                            :
                                <span></span>
                            }
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-5 overflow">
							<PopularList detailArticle={(e)=>this.detailArticle(e)} detailQuestion={(e)=>this.goToDetailQuestion(e)}/>
                            <Accordion/>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect('allArticleDatabase, startComment, newArticle, questionId, baseUrl,seeComment', actions)(withRouter(DetailArticle));