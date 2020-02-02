import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/signUp.css';
import '../styles/css/chooseInterest.css';
import logo from '../images/logo-kodekula.png';
import { connect } from "unistore/react";
import { actions } from "../stores/store";
import js from '../images/js.png'

class ChooseInterest extends React.Component {

	render() {
        const x = [1,2,3,4,5,6,7,8,9,10,11]
        const tagList = x.map (() => {
            return (
                <React.Fragment>
                    <div className="col-lg-3 img-interest pb-2">
                        <div className="border">
                            <img src={js} alt=""/>
                            <div className='text-center'>
                                <input type="checkbox" className="form-check-input ml-0" id="tags"/>
                                <label className="form-check-label ml-3 tags-name" for="tags">Javascript</label>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
        )
        })
		return (
			<React.Fragment>
				<div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-2 col-sm-1 col-1"></div>
                        <div className="col-lg-6 col-md-8 col-sm-10 col-10">
                            <div className="border shadow-sm rounded register-box">
                                <div className="register-title text-center">
                                    <img src={logo} alt=""/>
                                </div>
                                <form className='register-form' action="">
                                    <div class="form-group row">
                                        <label for="job" className="col-sm-5 col-form-label input-box">Pekerjaan</label>
                                        <div className="col-sm-7">
                                        <input type="text" className="form-control input-box" id="job" name="job" required/>
                                        </div>
                                        <label for="interest" className="col-sm-5 col-form-label input-box">Minat</label>
                                        <div className="col-sm-7">
                                        <input type="text" className="form-control input-box" id="interest" name="interest" required/>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="border">
                                                <div className="row pl-2 pr-2 py-3 interest-list">
                                                        {tagList}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center register-button'>
                                        <button type="button" class="btn btn-outline-info">Lanjutkan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
			</React.Fragment>
		);
	}
}
export default connect('', actions)(withRouter(ChooseInterest));
