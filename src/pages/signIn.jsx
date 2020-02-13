import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/signUp.css';
import logo from '../images/logobiru1.png';
import { connect } from "unistore/react";
import { actions, store } from "../stores/store";
import Swal from 'sweetalert2';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios'

class SignIn extends React.Component {

	afterSignIn = async () => {
        const parameters = {
            username : this.props.username,
			password : this.props.password
        };
		
        const signIn = {
            method:"post",
            url: store.getState().baseUrl+"/auth",
            headers: {
                "Content-Type": "application/json"
            },
			data : parameters,
			validateStatus : (status) => {
                return status < 500
            }
		};
		
		await this.props.handleAPI(signIn)
		if (this.props.responseStatus === 200) {
			await this.props.getToken()
			await this.getUserDetail()
		} else if (this.props.responseStatus === 401) {
			Swal.fire({
				icon: 'error',
				title: 'Uups...',
				text: 'Username atau password salah'
			});
		}
	}

	getUserDetail = async () => {
        const userDetail = {
            method:"get",
            url: store.getState().baseUrl+"/users/me",
            headers: {
				"Content-Type": "application/json",
				'Authorization':'Bearer ' + localStorage.getItem("token")
            },
			validateStatus : (status) => {
                return status < 500
			}
		};

		await this.props.handleAPI(userDetail)
		await this.setLocalStorage()
		
	}

	setLocalStorage = () =>{
		// console.log(this.props.responseData)
		if(this.props.responseData.is_admin==='true'){
			this.props.history.push("/admin/pengguna")
			this.props.deleteResponse()
		} else {
			localStorage.setItem('email', this.props.responseData.user_data.email)
			this.props.history.push("/")
			this.props.deleteResponse()
		}
	}
	doSearch = () => {
		this.props.history.push('/pencarian')
	}

	googleSignIn = async () => {
        const parameters = {
            id_token : localStorage.getItem('gmail_token')
        }
        const signUp = {
            method:"post",
            url: store.getState().baseUrl+"/auth/google",
            headers: {
                "Content-Type": "application/json"
            },
            data : parameters
        };
        
        console.log('isi signup google', signUp)
        const self = this
        const getDataRes = await axios(signUp);
        await self.setState({ responseData: getDataRes.data}); 
        await console.log('isi respon data user',this.state.responseData)
        await localStorage.setItem('token', this.state.responseData.token)
        await localStorage.setItem('username', this.state.responseData.username)
        await localStorage.setItem('email', this.state.responseData.email)
        await localStorage.removeItem('gmail_token', this.state.responseData.token)
        await localStorage.removeItem('gmail_username', this.state.responseData.username)
        await localStorage.removeItem('gmail_email', this.state.responseData.username)
        await this.props.history.push('/')                  
	}

	handleGoogleSignUp=()=>{
        const signUp = true
        localStorage.setItem('status', signUp)
	}
	
	render() {
		if(localStorage.getItem('gmail_token')!==null){
            this.googleSignIn()
            return(
                <div>
                </div>
            )
        } else {
			return (
				<React.Fragment>
					<Header doSearch={this.doSearch}/>
					<div className="container pt-5">
						<div className="row">
							<div className="col-lg-3 col-md-2 col-sm-1 col-1" />
							<div className="col-lg-6 col-md-8 col-sm-10 col-10">
								<div className="border shadow-sm rounded register-box">
									<div className="register-title text-center">
										<img src={logo} alt="" />
									</div>
									<form className="register-form fixed-left" action=""  onSubmit={e => e.preventDefault()}>
										<div class="form-group row">
											<label for="username" className="col-sm-5 col-form-label input-box">
												Username
											</label>
											<div className="col-sm-7">
												<input
													type="text"
													className="form-control input-box"
													id="username"
													name="username" onChange={ e => this.props.setGlobal(e)}
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
													data-toggle="password" onChange={ e =>this.props.setGlobal(e)}
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
											<button type="submit" class="btn btn-outline-info" onClick={()=>this.afterSignIn()}>
												Masuk
											</button>

										</div>
									</form>
									<div className="text-center my-2">atau</div>
									<div className="text-center register-button">
									<div className='row'>
										<div className='col-md-4'></div>
										<div className='col-md-4'>
											<div onClick={()=>this.handleGoogleSignUp()} class="g-signin2" data-onsuccess="onLogIn"></div>
										</div>
										<div className='col-md-4'></div>
									</div>
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
}
export default connect('username, password, responseData, responseStatus', actions)(withRouter(SignIn));
