import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/signUp.css';
import logo from '../images/logo-kodekula.png';
import google2 from '../images/google2.png';
import { connect } from "unistore/react";
import { actions, store } from "../stores/store";
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/header';
import Footer from '../components/footer';

class SignIn extends React.Component {

	render() {
		return (
			<React.Fragment>
				<Header/>
				<div className="container pt-5">
					<div className="row">
						<div className="col-lg-3 col-md-2 col-sm-1 col-1" />
						<div className="col-lg-6 col-md-8 col-sm-10 col-10">
							<div className="border shadow-sm rounded register-box">
								<div className="register-title text-center">
									<img src={logo} alt="" />
								</div>
								<form className="register-form fixed-left" action="">
									<div class="form-group row">
										<label for="username" className="col-sm-5 col-form-label input-box">
											Username
										</label>
										<div className="col-sm-7">
											<input
												type="text"
												className="form-control input-box"
												id="username"
												name="username"
												required
											/>
										</div>
										<label for="password" className="col-sm-5 col-form-label input-box">
											Password
										</label>
										<div className="col-sm-7 input-group">
											<input
												type="password"
												className="form-control input-box mr-0"
												id="password"
												name="password"
												data-toggle="password"
												required
											/>
											<div className="input-group-append">
												<Link className="input-group-text" style={{height:'38px', textDecoration:'None'}} onClick={()=>this.props.showPassword('password','imgPassword')}>
													<i className='material-icons' id='imgPassword'>visibility</i>
												</Link>
											</div>
										</div>
									</div>
									<div className="text-center register-button">
										<Link style={{textDecoration:'none'}} to='/profil'>
											<button type="button" class="btn btn-outline-info">
												Masuk
											</button>
										</Link>
									</div>
								</form>
								<div className="text-center my-2">atau</div>
								<div className="text-center register-button">
									<button type="button" className="btn btn-outline-info">
										Masuk dengan <img src={google2} alt="" width="75px" className="ml-1" />
									</button>
								</div>
								<div className="text-center mt-3 register-login">
									Belum punya akun? Daftar <Link to='/daftar' style={{textDecoration:'None'}}>disini</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			<Footer/>
		</React.Fragment>
		);
	}
}
export default connect('', actions)(withRouter(SignIn));