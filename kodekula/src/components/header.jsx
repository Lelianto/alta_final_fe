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
	if (localStorage.getItem('email') === null) {
		return (
			<header>
				<nav className="navbar navbar-expand-lg">
					<Link
						className="logo-kodekula"
						to="/"
						onClick={() =>
							store.setState({
								locationPage: null,
								keyword : '',
								articleTitle: '',
								newArticle: '',
								imageUrl: '',
								imageArticleUrl: '',
								allArticleDatabase:{},
								startComment: false,
								menuBarUpload: false
							})}
					>
						<img src={logo} alt="img" width="10%" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<div className="col-md-1">
							<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/artikel"
										onClick={() =>
											store.setState({
												locationPage: 'article',
												keyword : '',
												articleTitle: '',
												newArticle: '',
												imageUrl: '',
												imageArticleUrl: '',
												allArticleDatabase:{},
												startComment: false,
												menuBarUpload: false
											})}
									>
										Artikel
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-1">
							<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/pertanyaan"
										onClick={() =>
											store.setState({
												locationPage: 'question',
												keyword : '',
												articleTitle: '',
												newArticle: '',
												imageUrl: '',
												imageArticleUrl: '',
												allArticleDatabase:{},
												startComment: false,
												menuBarUpload: false
											})}
									>
										Pertanyaan
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-7">
							<form
								className="search-component form-inline my-2 my-lg-0"
								onSubmit={(e) => e.preventDefault()}
							>
								<div className="col-md-11" style={{ paddingRight: '0px' }}>
									<input
										className="input-search-component form-control mr-sm-5"
										type="text"
										placeholder="Pencarian"
										name="keyword"
										style={{ width: '100%' }}
										onChange={props.setInput}
									/>
								</div>
								<div className="col-md-1" style={{ paddingLeft: '5px' }}>
									<button
										onClick={props.doSearch}
										className="btn btn-info my-2 my-sm-0"
										type="submit"
										style={{ paddingLeft: '25px', paddingRight: '25px' }}
									>
										Cari
									</button>
								</div>
							</form>
						</div>
						<div className="col-md-1 ml-5">
							<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/daftar"
										onClick={() =>
											store.setState({
												articleTitle: '',
												newArticle: '',
												imageUrl: '',
												imageArticleUrl: '',
												startComment: false,
												menuBarUpload: false
											})}
									>
										Daftar
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-1">
							<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/masuk"
										onClick={() =>
											store.setState({
												articleTitle: '',
												newArticle: '',
												imageUrl: '',
												imageArticleUrl: '',
												startComment: false,
												menuBarUpload: false
											})}
									>
										Masuk
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
		);
	} else {
		return (
			<header>
				<nav className="navbar navbar-expand-lg">
					<Link className="logo-kodekula" to="/" onClick={()=>store.setState({locationPage : null, keyword : ''})}>
						<img style={{ width: '10%' }} src={logo} alt="img" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<div className="col-md-1">
							<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/artikel"
										onClick={() =>
											store.setState({
												locationPage: 'article',
												keyword : '',
												articleTitle: '',
												newArticle: '',
												imageUrl: '',
												imageArticleUrl: '',
												startComment: false,
												menuBarUpload: false
											})}
									>
										Artikel
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-1">
							<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/pertanyaan"
										onClick={() =>
											store.setState({
												locationPage: 'question',
												keyword : '',
												articleTitle: '',
												newArticle: '',
												imageUrl: '',
												imageArticleUrl: '',
												startComment: false,
												menuBarUpload: false
											})}
									>
										Pertanyaan
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-7">
							<form
								className="search-component form-inline my-2 my-lg-0"
								onSubmit={(e) => e.preventDefault()}
							>
								<div className="col-md-11" style={{ paddingRight: '0px' }}>
									<input
										className="input-search-component form-control mr-sm-5"
										type="text"
										placeholder="Pencarian"
										name="keyword"
										style={{ width: '100%' }}
										onChange={props.setInput}
									/>
								</div>
								<div className="col-md-1" style={{ paddingLeft: '5px' }}>
									<button
										onClick={() => props.doSearch()}
										className="btn btn-info my-2 my-sm-0"
										type="submit"
										style={{ paddingLeft: '25px', paddingRight: '25px' }}
									>
										Cari
									</button>
								</div>
							</form>
						</div>
						<div className="col-md-1" />
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/notifikasi"
									onClick={() =>
										store.setState({
											articleTitle: '',
											locationPage : null,
											newArticle: '',
											imageUrl: '',
											imageArticleUrl: '',
											startComment: false,
											menuBarUpload: false
										})}
								>
									<img src={notification} alt="img" width="30px" />
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item dropleft">
								<Link
									className="nav-link dropdown-toggle"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<img src={user} alt="img" style={{ borderRadius: '50%' }} width="30px" />
								</Link>
								<div className="dropdown-menu" style={{ marginTop: '0px', marginRight: '0px' }}>
									<Link
										className="dropdown-item"
										to="/profil"
										onClick={() =>
											store.setState({
												locationPage: null,
												articleTitle: '',
												newArticle: '',
												imageUrl: '',
												imageArticleUrl: '',
												startComment: false,
												menuBarUpload: false
											})}
									>
										Profil
									</Link>
									<Link className="dropdown-item" to="/pengaturan-akun">
										Pengaturan Akun
									</Link>
									<Link className="dropdown-item" to="/" onClick={() => props.afterSignOut()}>
										Keluar
									</Link>
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
};

export default connect('', actions)(withRouter(Header));
