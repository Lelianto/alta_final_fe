import React from 'react';
import '../styles/css/articlePage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/header';
import Footer from '../components/footer';
import InterestList from '../components/interestList';
import PopularList from '../components/popularList';
import AccessDetailArticle from '../components/detailQuestion';
import CommentArea from '../components/commentArea';
import ViewComment from '../components/viewComment';
import Accordion from '../components/accordionExplain';
import CodeCompiler from '../components/codeCompiler';
import axios from 'axios';

const listContent = [ 'Artikel' ];

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
		this.props.history.push('/')
	  }

	render() {
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch}/>
				<div className="container-fluid pt-4">
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-1 col-md-1 col-sm-12 col-12 mt-5">
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0" >
							<AccessDetailArticle/>
						{store.getState().seeComment?
							<div>
								<button className='btn btn-grad' onClick={()=>this.handleSeeComment()} style={{textAlign:'center', marginBottom:'20px', fontWeight:'bold'}}>
									Lihat Komentar...
								</button>
							</div>
						:
							<div>
								<button className='btn btn-grad' onClick={()=>this.handleSeeComment()} style={{textAlign:'center', marginBottom:'20px', fontWeight:'bold'}}>
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
