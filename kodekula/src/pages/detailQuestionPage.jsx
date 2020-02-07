import React from 'react';
import '../styles/css/articlePage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import InterestList from '../components/interestList';
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
		article: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit',
			'Alias corrupti velit illum sequi quas omnis esse ipsam sed aut delectus blanditiis',
			'Deserunt dolor temporibus enim deleniti a!',
			'Pariatur exercitationem atque non excepturi, cum',
			'reiciendis mollitia error maxime earum totam, placeat quod! Ipsa, eum'
		]
	};

	seeAll = () => {
		const suggestionList = document.getElementById('suggest-list');
		const showOrHide = document.getElementById('seeAll');
		if (suggestionList.style.display === 'none') {
			suggestionList.style.display = 'block';
			showOrHide.innerHTML = 'Sembunyikan...';
		} else {
			suggestionList.style.display = 'none';
			showOrHide.innerHTML = 'Lihat Semua...';
		}
	};
	
	handleQuestionPage =()=>{
		const req = {
			method: "get",
			url: store.getState().baseUrl+"/posting/toplevel/"+this.props.match.params.id
		  }; 
		  const questionIdParam = this.props.match.params.id
		  const self = this
		  axios(req)
			  .then((response) => {
				  console.log('isi respon detail1',response.data.posting_data.posting_detail.html_content)
				store.setState({ 
				  allArticleDatabase: response.data, 
				  isLoading:false,
				  questionId:questionIdParam
				})
				console.log('isi response', response.data.posting_data.posting_detail)
				return response
			  })
			  .catch((error)=>{
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

	componentWillMount = async () => {
		await this.handleQuestionPage()
	};

	render() {
		return (
			<React.Fragment>
				<Header />
				<div className="container-fluid pt-4">
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

							<CommentArea/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-5">
							<PopularList article={this.state.article} />
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
