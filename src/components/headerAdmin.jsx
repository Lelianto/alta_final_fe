import React from 'react';
import '../styles/css/header.css';
import '../styles/css/bootstrap.min.css';
import logo from '../images/finalogo.png';
import user from '../images/user.png';
import notification from '../images/bell.png';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';

const Header = (props) => {
	if (localStorage.getItem('username') === null) {
		return (
			<header>
				<nav class="navbar navbar-expand-lg">
					<Link className="logo-kodekula" onClick={()=>store.setState({
						location : 'home',
						articleTitle:'',
						newArticle:'',
						imageUrl:'',
						imageArticleUrl:'',
						startComment: false,
						menuBarUpload:false
						})}>
						<img  src={logo} alt="img" width='10%'/>
					</Link>
				</nav>
			</header>
		);
	} else {
		return (
			<header>
				<nav class="navbar navbar-expand-lg">
					<Link className="logo-kodekula" >
						<img style={{ width: '10%' }} src={logo} alt="img" />
					</Link>
					<div className='col-md-9'>

					</div>
					<div className="col-md-1">
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<Link
									className="nav-link"
									onClick={() => props.afterSignOut()}
									to='/'
								>
									Keluar
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
};

export default connect('', actions)(withRouter(Header));
