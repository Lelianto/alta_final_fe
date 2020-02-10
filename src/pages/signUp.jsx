import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/signUp.css';
import logo from '../images/logo-kodekula.png';
import google2 from '../images/google2.png';
import { connect } from "unistore/react";
import { actions, store } from "../stores/store";
import Swal from 'sweetalert2';
import Header from '../components/header';
import Footer from '../components/footer';

class SignUp extends React.Component {

    state = {
        username : null,
        email : null,
        password : null,
        confirmPassword : null
    }

    setInput = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
    }

    afterSignUp = async () => {
        const parameters = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        };
        
        const signUp = {
            method:"post",
            url: store.getState().baseUrl+"/users",
            headers: {
                "Content-Type": "application/json"
            },
            data : parameters,
            validateStatus : (status) => {
                return status < 500
            }
        };
        console.log('isi signup google', signUp)
        if (this.state.username !== null && this.state.email !== null && this.state.password !==null && this.state.confirmPassword !== null) {
            if (this.state.password === this.state.confirmPassword) {
                await this.props.handleAPI(signUp)
                if (this.props.responseStatus === 200) {
                    await store.setState({username : this.state.username, email : this.state.email})
                    await this.afterSignIn()                    
                } else if (this.props.responseStatus === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Uups...',
                        text: 'Username atau email sudah terdaftar'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Uups...',
                    text: 'Konfirmasi Password tidak sesuai'
                });
            }
        }
		
    }

    afterSignIn = async () => {
        const parameters = {
            username : this.state.username,
			password : this.state.password
        };
		
        const signIn = {
            method:"post",
            url: "https://api.kodekula.com/auth",
            headers: {
                "Content-Type": "application/json"
            },
            data : parameters
		};
		
        await this.props.handleAPI(signIn)
        await this.props.getToken()
        await localStorage.setItem("email", this.state.email)
		await this.props.history.push('/pilih-minat')
        await this.props.deleteResponse()
    }
    
    doSearch = () => {
        this.props.history.push('/pencarian')
    }

    onSignIn = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        console.log('ID: ' + id_token); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        this.setState({
            username: profile.getEmail(),
            email: profile.getEmail(),
            password: id_token
        })
        this.afterSignUp()
      }

	render() {
		return (
			<React.Fragment>
                <Header doSearch={this.doSearch}/>
				<div className="container pt-5">
                    <div className="row">
                        <div className="col-lg-3 col-md-2 col-sm-1 col-1"></div>
                        <div className="col-lg-6 col-md-8 col-sm-10 col-10">
                            <div className="border shadow-sm rounded register-box">
                                <div className="register-title text-center">
                                    <img src={logo} alt=""/>
                                </div>
                                <form className='register-form fixed-left' action="/pilih-minat" onSubmit={e => e.preventDefault()}>
                                    <div class="form-group row">
                                        <label for="username" className="col-sm-5 col-form-label input-box">Username</label>
                                        <div className="col-sm-7">
                                        <input type="text" className="form-control input-box" id="username" name="username" onChange={ e => this.setInput(e)} required/>
                                        </div>
                                        <label for="email" className="col-sm-5 col-form-label input-box">Email</label>
                                        <div className="col-sm-7">
                                        <input type="email" className="form-control input-box" id="email" name="email" onChange={ e => this.setInput(e)} required/>
                                        </div>
                                        <label for="password" className="col-sm-5 col-form-label input-box">Password</label>
                                        <div className="col-sm-7 input-group">
											<input
												type="password"
												className="form-control input-box mr-0"
												id="password"
												name="password"
												data-toggle="password" onChange={ e => this.setInput(e)}
												required
											/>
											<div className="input-group-append">
												<Link className="input-group-text" style={{height:'38px', textDecoration:'None'}} onClick={()=>this.props.showPassword('password','imgPassword')}>
													<i className='material-icons' id='imgPassword'>visibility</i>
												</Link>
											</div>
										</div>
                                        <label for="confirm-password" className="col-sm-5 col-form-label input-box">Konfirmasi Password</label>
                                        <div className="col-sm-7 input-group">
											<input
												type="password"
												className="form-control input-box mr-0"
												id="confirm-password"
												name="confirmPassword"
												data-toggle="password" onChange={ e => this.setInput(e)}
												required
											/>
											<div className="input-group-append">
												<Link className="input-group-text" style={{height:'38px', textDecoration:'None'}} onClick={()=>this.props.showPassword('confirm-password','imgPassword2')}>
													<i className='material-icons' id='imgPassword2'>visibility</i>
												</Link>
											</div>
										</div>
                                    </div>
                                    <div className='text-center register-button'>
                                        <button type="submit" class="btn btn-outline-info" onClick={()=>this.afterSignUp()}>Daftar</button>
                                    </div>
                                </form>
                                <div className='text-center my-2'>atau</div>
                                <div className='row'>
                                    <div className='col-md-4'></div>
                                    <div className='col-md-4'>
                                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                                    </div>
                                    <div className='col-md-4'></div>
                                </div>
                                {/* <div className='text-center register-button'>
                                    <button type="button" className="btn btn-outline-info">Daftar dengan <img src={google2} alt="" width='75px' className='ml-1'/></button>
                                </div> */}
                                <div className='text-center mt-3 register-login'>Sudah punya akun? Masuk <Link to='/masuk' style={{textDecoration:'None'}} >disini</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
			</React.Fragment>
		);
	}
}
export default connect('responseData, responseStatus, username, email', actions)(withRouter(SignUp));
