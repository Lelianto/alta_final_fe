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
        comment : '',
		article: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit',
			'Alias corrupti velit illum sequi quas omnis esse ipsam sed aut delectus blanditiis',
			'Deserunt dolor temporibus enim deleniti a!',
			'Pariatur exercitationem atque non excepturi, cum',
			'reiciendis mollitia error maxime earum totam, placeat quod! Ipsa, eum'
		]
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
    componentWillMount = async () => {
        await this.getAllFirst()
    };
    
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
        const req = {
          method: "get",
          url: store.getState().baseUrl+"/posting/toplevel/"+this.props.match.params.id
        }; 
        const questionIdParam = this.props.match.params.id
        const self = this
        await axios(req)
            .then((response) => {
              console.log('isi respon detail',response.data.posting_data.posting_detail.html_content)
              store.setState({ 
                allArticleDatabase: response.data, 
                isLoading:false,
                questionId:questionIdParam
              })
              console.log('hasil detail first data',store.getState().allArticleDatabase)
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
          };

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
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0" >
                            <AccessDetailArticle/>
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
                                        <ViewComment/>
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
						<div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-5">
							<PopularList article={this.state.article} />
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
