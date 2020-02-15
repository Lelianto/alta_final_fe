import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu';
import axios from 'axios';
import Loader from '../components/loader'


class AdminLandingPage extends React.Component {
	state = {
		search : '',
		allUsers : this.props.allUser.query_data,
		searchResult : []
	}

	/**
	 * @function handleChangePage() send admin to the others page based on event
	 */
	handleChangePage = (event) => {
		localStorage.removeItem('grafik')
		this.props.history.push('/admin'+event)
	}

	/**
	 * @function handleChangePageMenu() send admin to user graph page
	 */
	handleChangePageMenu = (event) => {
		store.setState({
			menu:'/user'
		})
		localStorage.setItem('grafik', '/user')
		this.props.history.push('/admin'+event)
	}

	/**
	 * @function getAllUser() get all user by admin
	 */
	getAllUser = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/user",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
		}; 
		const self = this
		await axios(req)
			.then((response) => {
				store.setState({ allUser: response.data, isLoading:false, menu:'/user'})
				self.setState({searchResult : response.data.query_data})
				return response
			})
			.catch((error)=>{
				store.setState({ 
					isLoading: false
				})
			})
		}

	/**
	 * @function componentWillMount() trigger get all user by admin
	 */
	componentWillMount = ()=>{
			this.getAllUser()
		}
	
	/**
	 * @function handleDeleteUser() handle soft delete user by admin
	 */
	handleDeleteUser = async (event) => {
		await store.setState({
			idUser:event
		})
		await this.props.delUser()
		await this.getAllUser()
		await this.props.history.push('/admin/pengguna')
	}

	searchUser = async (event) => {
		await this.setState({search : event.target.value})
		const allUser = await this.props.allUser.query_data
		const detailData = await allUser.filter(user => user.user_detail.first_name !== null && user.user_detail.last_name !== null && user.user_detail.job_title !== null)
		if (this.state.search.length > 0) {
			const searchData = await allUser.filter(user => 
				user.username.toLowerCase().indexOf(this.state.search) > -1 || user.email.toLowerCase().indexOf(this.state.search) > -1 
				)
			const searchDetailData = await detailData.filter(user => 
				user.user_detail.first_name.toLowerCase().indexOf(this.state.search) > -1 ||
				user.user_detail.last_name.toLowerCase().indexOf(this.state.search) > -1 ||
				user.user_detail.job_title.toLowerCase().indexOf(this.state.search) > -1
				)
			const searchResult = await searchData.concat(searchDetailData)
			await this.setState({searchResult : searchResult })
		} else {
			await this.setState({searchResult : this.props.allUser.query_data })
		}
	}

	render() {
		if(this.props.isLoading || this.props.allUser===null){
			return (
				<div>
					<Loader/>
				</div>
			)
		} else {
			const Users = this.state.searchResult
			return (
				<React.Fragment>
					<Header />
					<AdminMenu handleChangePage={(event)=>this.handleChangePage(event)}/>
					<div className='container'>
						<div className='row' style={{paddingTop:'50px'}}>
							<div className='col-md-3'></div>
							
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px',border: '2px solid sandybrown', marginLeft:'-16px', marginRight:'-16px'}}>
									Daftar Pengguna
								</div>
							</div>
							<div className='col-md-2'>
	
							</div>
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div onClick={()=>this.handleChangePageMenu('/pengguna/grafik')} className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px'}}>
									Grafik Pengguna
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
											onChange={(e)=>this.searchUser(e)}
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
									<th>Username</th>
									<th>Nama Depan</th>
									<th>Nama Belakang</th>			
									<th>Email</th>
									<th>Pekerjaan</th>
									<th>Tangguhkan</th>	
								</tr>
							</thead>
							<tbody>
								{Users === undefined ? 
							<div>
								<Loader/>
							</div>
							:
								Users.map((user,i)=>
									<tr>
										<td>{user.user_id}</td>
										<td>{user.username}</td>
										<td>{user.user_detail.first_name}</td>
										<td>{user.user_detail.last_name}</td>
										<td>{user.email}</td>
										<td>{user.user_detail.job_title}</td>
										{user.deleted===true?
											<td>
												<button disabled className='btn btn-info' style={{fontSize:'10px'}}>
											Sudah Dihapus
												</button>
											</td>
											:
											<td>
												<button onClick={()=>this.handleDeleteUser(user.user_id)} className='btn btn-danger' style={{fontSize:'10px'}}>
											Delete
												</button>
											</td>
											}
									</tr>
								)
							}
							</tbody>
						</table>
						</div>
					</div>
					<Footer />
				</React.Fragment>
			);
		}
	}
}
export default connect('menuBarUpload, isLoading, allUser', actions)(withRouter(AdminLandingPage));
