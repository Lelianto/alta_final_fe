import React from 'react';
import '../styles/css/articlePage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import PopularList from '../components/popularList';
import AccessDetailArticle from '../components/detailArticleQuestion';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import user from '../images/user.png';
import ViewComment from '../components/viewComment';
import Accordion from '../components/accordionExplain'

class DetailArticle extends React.Component {
	state = {
        comment : ''
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
                console.log('isi respon detail',response.data.posting_data)
                store.setState({ 
                  allArticleDatabase: response.data, 
                  isLoading:false,
                  questionId:questionIdParam
                })
                self.setState({
                    comment:''
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
    
    changeState = async (event) => {
        await this.setState({comment : event.target.value})
    }

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
        console.log('isi comment', comment)
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
    
    doSearch = () => {
        this.props.history.push('/pencarian')
      }
      
    componentWillMount = async () => {
        await this.getAllFirst()
        await this.props.getPopular();
    };

    editArticle = async (event) => {
        await store.setState({
            userId: event
        });
        await this.props.history.push('/artikel/' + event + '/edit');
    };

	deleteArticle = async (event)=> {
		console.log('isi event',event)
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url
		})
		await this.props.delArticle()
		console.log('DELETED')
		// await this.getPostingList()
        await this.props.history.push('/')
	}

	getProfile = async (id, username) => {
		await store.setState({
			urlProfile : 'https://kodekula.herokuapp.com/users/'+id,
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
		console.log('isi event del',event)
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
                        {/* <title>Artikel</title> */}
                        <meta name="description" content="Berisi artikel yang membahas tentang pemrograman" />
                    </Helmet>
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-1 col-md-1 col-sm-12 col-12 mt-5">
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0 overflow" >
                            <AccessDetailArticle 
                                editArticle={(e) => this.editArticle(e)}
                                deleteArticle={(e)=>this.deleteArticle(e)} 
                                getProfile={this.getProfile}
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
