import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/header';
import Footer from '../components/footer';
import InterestList from '../components/interestList';
import PopularList from '../components/popularList';
import UserOwnFile from '../components/userOwnFile';

const listContent = [ 'Artikel', 'Pertanyaan' ];

class Home extends React.Component {
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

	render() {
		return (
			<React.Fragment>
				<Header />
				<div className="container-fluid pt-4">
					<div className="row" style={{ fontFamily: 'liberation_sansregular' }}>
						<div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-5">
							<InterestList tags={this.state.tags} icon={this.state.icon} seeAll={this.seeAll} />
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-5 pl-0 pr-0">
							{listContent.map((type, i) => <UserOwnFile typeContent={type} />)}
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-5">
							<PopularList article={this.state.article} />
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect('', actions)(withRouter(Home));
