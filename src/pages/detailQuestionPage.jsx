import React from 'react';
import '../styles/css/articlePage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';
import PopularList from '../components/popularList';
import AccessDetailArticle from '../components/detailArticleQuestion';
import CommentArea from '../components/commentArea';
import ViewComment from '../components/viewComment';
import Accordion from '../components/accordionExplain';
import CodeCompiler from '../components/codeCompiler';
import axios from 'axios';

const listContent = [ 'Pertanyaan' ];

class detailArticlePage extends React.Component {
	state = {
		tags: [ 'Python', 'Javascript', 'Django', 'ReactJS', 'Java', 'GoLang' ],
		icon: [ 'bug_report', 'build', 'android', 'camera_enhance', 'autorenew', 'code' ],
		likeList : [],
		contentLoading : true
	};

	getAllFirst = ()=>{
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/posting/toplevel/"+this.props.match.params.id
          }; 
          const questionIdParam = this.props.match.params.id
          const self = this
          axios(req)
              .then((response) => {
                store.setState({ 
                  allArticleDatabase: response.data, 
                  isLoading:false,
                  questionId:questionIdParam
                })
                return response
              })
              .catch((error)=>{
                console.log(error)
                store.setState({ 
                  isLoading: false
                })
                switch (error.response.status) {
                  case 401 :
                      self.props.history.push('/login')
                      break
                  case 403 :
                      self.props.history.push('/403')
                      break
                  case 404 :
                      self.props.history.push('/404')
                      break
                  case 500 :
                      self.props.history.push('/500')
                      break
                  default :
                      break
                }
              })
	}
	
    componentWillMount = async () => {
		await this.getAllFirst()
		await this.props.getPopular();
		if (localStorage.getItem('token')!==null){
            this.getLikeList()
        }
    };


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

	handlePostComment = async () => {
		await this.props.postComment()
		await this.getAllFirst()
        await this.props.history.push("/pertanyaan/"+this.props.match.params.id)
	}
	
	doSearch = () => {
		this.props.history.push('/pencarian')
	  }

    editQuestion = async (event) => {
        await store.setState({
            userId: event
        });
        await this.props.history.push('/pertanyaan/' + event + '/edit');
    };

    deleteQuestion = async (event)=> {
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delQuestion()
        await this.props.history.push('/')
	}

	getProfile = async (id, username) => {
		await store.setState({
			urlProfile : store.getState().baseUrl+'/users/'+id,
			uname : username
		})
		await this.props.history.push('/profil/'+username+'/pertanyaan')
	}

	detailArticle = async (event) => {
		await store.setState({
			userId: event
		});
		await this.props.history.push('/artikel/' + event);
    };
    
    goToDetailQuestion = async (event) => {
		store.setState({
			userId: event
		});
		await this.props.history.push('/pertanyaan/' + event);
	};

	handleDeleteAnswer = async (event) => {
		await store.setState({
			idComment:event.id,
			htmlContent:event.html_content
		})
		await this.props.delComment()
		await this.getAllFirst()
		await this.props.history.push('/pertanyaan/'+this.props.match.params.id)
	}

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
			if (like.deleted === false) {
				await postId.push(like.locator_id)
			}
		})
		await this.setState({likeList : postId, contentLoading : false})
	}

	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch}/>
				<Helmet>
					{/* <title>Pertanyaan</title> */}
					<meta name="description" content="Berisi artikel yang membahas tentang pemrograman" />
				</Helmet>
				<div className="container-fluid pt-4">
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-1 col-md-1 col-sm-12 col-12 mt-5">
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow" >
							<AccessDetailArticle
								editQuestion={(e) => this.editQuestion(e)}
								deleteQuestion={(e)=>this.deleteQuestion(e)}
								getProfile={this.getProfile}
								likeList = {this.state.likeList}
							/>
						{store.getState().seeComment?
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
									<ViewComment handleDeleteAnswer={(event)=>this.handleDeleteAnswer(event)}/>
							</div>
						}

							<CommentArea handlePostComment={()=>this.handlePostComment()}/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-5 overflow">
							<PopularList detailArticle={(e)=>this.detailArticle(e)} detailQuestion={(e)=>this.goToDetailQuestion(e)} />
							<Accordion/>
							<CodeCompiler/>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect('seeComment, allArticleDatabase, startComment, newArticle', actions)(withRouter(detailArticlePage));
