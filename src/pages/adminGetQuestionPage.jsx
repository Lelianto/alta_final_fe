import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios'
import Loader from '../components/loader'
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu'


class AdminLandingPage extends React.Component {
	state = {
		search : '',
		searchResult : [],
		allQuestions : this.props.allQuestion.query_data
	}

	/**
	 * @function handleChangePage() send admin to the others page based on event
	 */
	handleChangePage = (event) => {
		localStorage.removeItem('grafik')
		this.props.history.push('/admin'+event)
	}

	/**
	 * @function handleChangePageMenu() send admin to question graph page
	 */
	handleChangePageMenu = (event) => {
		store.setState({
			menu:'/question'
		})
		localStorage.setItem('grafik', '/question')
		this.props.history.push('/admin'+event)
	}

	/**
	 * @function getAllQuestion() get all question by admin
	 */
	getAllQuestion = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/question",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
		const self = this
		await axios(req)
			.then( async (response) => {
				store.setState({ allQuestion: response.data, isLoading:false})
				this.setState({searchResult : response.data.query_data})
				return response
			})
			.catch((error)=>{
				store.setState({ 
					isLoading: false
				})
				switch (error.response.status) {
					case 401 :
						self.props.history.push('/401')
						break
					case 403 :
						self.props.history.push('/403')
						break
					case 404 :
						self.props.history.push('/404')
						break
					case 422 :
						self.props.history.push('/422')
						break
					case 500 :
						self.props.history.push('/500')
						break
					default :
						break
				}
			})
		}

	/**
	 * @function componentWillMount() trigger get all question by admin
	 */
	componentWillMount = ()=>{
		this.getAllQuestion()
	}

	/**
	 * @function deleteQuestion() handle soft delete question by admin
	 */
	deleteQuestion = async (event)=> {
		store.setState({
			articleId:event.id,
			articleTitle:event.title,
			lastArticleQuestion:event.html_content,
			imageUrl:event.banner_photo_url,
			putTag: event.tags
		})
		await this.props.delQuestion()
		await this.getAllQuestion()
        await this.props.history.push('/admin/pertanyaan')
	}

	/**
	 * @function searchQuestion() handle search article by admin
	 */
	searchQuestion = async (event) => {
		await this.setState({search : event.target.value})
		const allQuestion = await this.props.allQuestion.query_data
		if (this.state.search.length > 0) {
			const searchData = allQuestion.filter(question => 
				question.posting_detail.title.toLowerCase().indexOf(this.state.search) > -1 ||
				question.user_data.username.toLowerCase().indexOf(this.state.search) > -1
				)
			await this.setState({searchResult : searchData })
		} else {
			await this.setState({searchResult : this.props.allQuestion.query_data })
		}
	}

	render() {
		if(this.props.isLoading || this.props.allQuestion===[]){
			return (
				<div>
					<Loader/>
				</div>
			)
		} else {
			const questions = this.state.searchResult
			return (
				<React.Fragment>
					<Header />
					<AdminMenu handleChangePage={(event)=>this.handleChangePage(event)}/>
					<div className='container'>
						<div className='row' style={{paddingTop:'50px'}}>
							<div className='col-md-3'></div>
							
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', border: '2px solid sandybrown', marginLeft:'-16px', marginRight:'-16px'}}>
									Daftar Pertanyaan
								</div>
							</div>
							<div className='col-md-2'>
	
							</div>
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div onClick={()=>this.handleChangePageMenu('/pertanyaan/grafik')} className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px'}}>
									Grafik Pertanyaan
								</div>
							</div>
							<div className='col-md-3'></div>
						</div>
					</div>
					<div className='container'>
						<div className='row' style={{paddingTop:'30px'}}>
							<div className="col-md-12">
								<form
									className="search-component form-inline my-2 my-lg-0"
									onSubmit={(e) => e.preventDefault()}
								>
									<div className="col-md-10" style={{ paddingRight: '0px' }}>
										<input
											className="input-search-component form-control mr-sm-5"
											type="text"
											placeholder="Pencarian"
											name="keyword"
											style={{ width: '100%' }}
											onChange={(e)=>this.searchQuestion(e)}
										/>
									</div>
									<div className="col-md-1" style={{ paddingLeft: '5px' }}>
										<button
											// onClick={() => props.doSearch()}
											className="btn btn-info my-2 my-sm-0"
											type="submit"
											style={{ paddingLeft: '25px', paddingRight: '25px' }}
										>
											Cari
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className='row' style={{paddingTop:'30px', paddingBottom:'75px'}}>
							<table class="table table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>Pertanyaan</th>
									<th>Username</th>
									<th>Total Views</th>
									<th>Tanggal Tanya</th>
									<th>Tangguhkan</th>	
								</tr>
							</thead>
							<tbody>
								{questions.map((question,i)=>
									<tr>
										<td>{question.posting_detail.id}</td>
										<td style={{width:'325px'}}>{question.posting_detail.title}</td>
										<td>{question.user_data.username}</td>
										<td>{question.posting_detail.views}</td>
										<td>{question.posting_detail.created_at}</td>{question.posting_detail.content_status===2?
											<td>
												<button disabled className='btn btn-info' style={{fontSize:'10px'}}>
											Sudah Dihapus
												</button>
											</td>
											:
											<td>
												<button onClick={()=>this.deleteQuestion(question.posting_detail)} className='btn btn-danger' style={{fontSize:'10px'}}>
											Delete
												</button>
											</td>
											}
									</tr>
								)}
							</tbody>
						</table>
						</div>
					</div>
					<Footer />
				</React.Fragment>
			)
		}
	}
}
export default connect('menuBarUpload, isLoading, allQuestion', actions)(withRouter(AdminLandingPage));
