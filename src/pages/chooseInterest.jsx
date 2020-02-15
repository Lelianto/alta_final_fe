import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/css/signUp.css';
import '../styles/css/chooseInterest.css';
import logo from '../images/logo-kodekula.png';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

class ChooseInterest extends React.Component {
    state = {
        interestList : [],
		interest : [],
		search : '',
		searchResult : []
    }

	/**
	 * @function componentDidMount() get all interest list
	 */
	componentDidMount = async () => {
		const tags = {
			method: 'get',
			url: store.getState().baseUrl+'/tags',
			headers: {
				'Content-Type': 'application/json'
			}
        };
        await axios(tags)
			.then(async (response) => {
				const interestData = response.data
				let i;
				for (i=0; i<interestData.length; i++) {
					interestData[i]['checked'] = false
					interestData[i]['index'] = i
				}
				await this.setState({interestList : interestData, searchResult : interestData})
			})
			.catch(async (error) => {
				await console.warn(error)
			})
	};
	
	/**
	 * @function addInterest() add interest by user
	 */
    addInterest = async (event, index) => {
		let interestList = this.state.interestList
		interestList[index]['checked'] = event.target.checked
		this.setState({interestList : interestList})
        if (event.target.checked === true) {
            await this.state.interest.push(event.target.value)
        } else {
            const newTags = this.state.interest.filter(item => item !==event.target.value)
			await this.setState({interest : newTags})
        }
	}
	
	/**
	 * @function addInterest() edit or update interest by user
	 */
	putInterest = async () => {
		const userDetail = {
			username : localStorage.getItem("username"),
			email : localStorage.getItem("email"),
			job_title : this.props.job,
			tags : this.state.interest
		}
		const editUser = {
			method: 'put',
			url: store.getState().baseUrl+'/users/me',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + localStorage.getItem("token")
			},
			data : userDetail,
			validateStatus : (status) => {
                return status < 500
            }
		}

		await this.props.handleAPI(editUser)
		this.props.history.push('/')
	}

	/**
	 * @function doSearch() handling searching
	 */
	doSearch = async (event) => {
		await this.setState({search : event.target.value})
		if (this.state.search.length > 0) {
			const searchData = this.state.interestList.filter(item => item.name.toLowerCase().indexOf(this.state.search) > -1
			)
			await this.setState({searchResult : searchData })
			
		} else {
			await this.setState({searchResult : this.state.interestList })
		}
	}

	/**
	 * @function searchContent() go to search result page
	 */
	searchContent = () => {
		this.props.history.push('/pencarian')
	}

	render() {
		let tagsList = this.state.searchResult;
		let tagData;
		if (tagsList !== undefined && tagsList !== null) {
			tagData = tagsList.map((tag) => {
				return (
					<React.Fragment>
						<div className="col-lg-4 col-md-4 col-sm-6 col-6 img-interest pb-3">
							<div className="border">
                                <div className='logo-tags' style={{ height:'130px'}}>
                                    <img src={tag.photo_url} alt="" />
                                </div>
								<div className="text-center" style={{backgroundColor:'#0f4c75', color:'white'}}>
									<input type="checkbox" className="form-check-input ml-0" checked={tag.checked} id="tags" value={tag.name} onClick={(e)=>this.addInterest(e, tag.index)}/>
									<label className="form-check-label ml-3 tags-name" for="tags">
										{tag.name}
									</label>
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			});
        } else {
			return (
				<React.Fragment>
					<Header doSearch={this.searchContent}/>
					<div className="container pt-5">
						<div className="row">
							<div className="col-lg-3 col-md-2 col-sm-1 col-1" />
							<div className="col-lg-6 col-md-8 col-sm-10 col-10">
								<div className="border shadow-sm rounded register-box">
									<div className="register-title text-center">
										<img src={logo} alt="" />
									</div>
									<form className="register-form" action="" onSubmit={e => e.preventDefault()}>
										<div class="form-group row">
											<label for="job" className="col-sm-5 col-form-label input-box">
												Pekerjaan
											</label>
											<div className="col-sm-7">
												<input
													type="text"
													className="form-control input-box"
													id="job"
													name="job" onChange={(e)=>this.props.setGlobal(e)}
												/>
											</div>
											<label for="interest" className="col-sm-5 col-form-label input-box">
												Minat
											</label>
											<div className="col-sm-7">
												<input
													type="text"
													className="form-control input-box"
													id="interest" placeholder="cari..."
													name="search" onChange={(e) => this.doSearch(e)}
												/>
											</div>
											<div className="col-sm-12">
												<div className="border interest-box">
													<div className="row pl-2 pr-2 py-3 interest-list">
														{tagData}
													</div>
												</div>
											</div>
										</div>
										<div className="text-center register-button">
											<button type="submit" class="btn btn-outline-info" onClick={()=>this.putInterest()}>
												Lanjutkan
											</button>
										</div>
									</form>
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
export default connect('job, responseStatus', actions)(withRouter(ChooseInterest));
