import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu';
import axios from 'axios';
import Loader from '../components/loader';


class AdminLandingPage extends React.Component {
	state = {
		search : '',
		searchResult : [],
		allTag : this.props.allTag.query_data
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
			menu:'/tag'
		})
		localStorage.setItem('grafik', '/tag')
		this.props.history.push('/admin'+event)
	}

	/**
	 * @function getAllTag() get all tag by admin
	 */
	getAllTag = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/tag",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
		const self = this
		await axios(req)
			.then(async (response) => {
				await store.setState({ allTag: response.data, isLoading:false})
				await self.setState({searchResult : response.data.query_data})
				return response
			})
			.catch((error)=>{
				store.setState({ 
					isLoading: false
				})
			})
	}

	/**
	 * @function componentWillMount() trigger get all tag by admin
	 */
	componentWillMount = ()=>{
		this.getAllTag()
	}

	/**
	 * @function handlePostTag() handle add tag by admin
	 */
	handlePostTag = async () => {
		await this.props.addNewTag()
		await this.componentWillMount()
		await this.props.history.push('/admin/tag')
	}

	/**
	 * @function searchTag() handle search article by admin
	 */
	searchTag = async (event) => {
		await this.setState({search : event.target.value})
		const allTag = await this.props.allTag.query_data
		if (this.state.search.length > 0) {
			const searchData = allTag.filter(tag => 
				tag.name.toLowerCase().indexOf(this.state.search) > -1
				)
			await this.setState({searchResult : searchData })
		} else {
			await this.setState({searchResult : this.props.allTag.query_data })
		}
	}

	render() {
		if(this.props.isLoading || this.props.allTag===null){
			return (
				<div>
					<Loader/>
				</div>
			)
		} else {
			const tags = this.state.searchResult
			return (
				<React.Fragment>
					<Header />
					<AdminMenu handleChangePage={(event)=>this.handleChangePage(event)}/>
					<div className='container'>
						<div className='row' style={{paddingTop:'50px'}}>
							<div className='col-md-3'></div>
							
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', border: '2px solid sandybrown', marginLeft:'-16px', marginRight:'-16px'}}>
									Daftar Tag
								</div>
							</div>
							<div className='col-md-2'>

							</div>
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div onClick={()=>this.handleChangePageMenu('/tag/grafik')} className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px'}}>
									Grafik Tag
								</div>
							</div>
							<div className='col-md-3'></div>
						</div>
					</div>
					<div className='container'>
						<div className='row' style={{paddingTop:'30px'}}>
							<div className="col-md-12">
								<form
									// className="search-component form-inline my-2 my-lg-0"
									onSubmit={(e) => e.preventDefault()}
								>
									<div className='row'>
										<div className='col-md-1'>

										</div>
										<div className="col-md-8" style={{ paddingRight: '0px' }}>
											<input
												className="input-search-component form-control mr-sm-5"
												type="text"
												placeholder="Pencarian"
												name="keyword"
												style={{ width: '98%' }}
												onChange={(e)=>this.searchTag(e)}
											/>
										</div>
										<div className="col-md-1" style={{ paddingLeft: '5px' }}>
											<button
												// onClick={() => props.doSearch()}
												className="btn btn-info my-2 my-sm-0"
												type="submit"
												style={{ paddingLeft: '52px', paddingRight: '52px', marginLeft:'22px' }}
											>
												Cari
											</button>
										</div>
										<div className='col-md-1'>

										</div>
									</div>
								</form>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className='row' style={{paddingTop:'30px'}}>
										<div className='col-md-1'>

										</div>
										<div className='col-md-4'>
											<input
												className="input-search-component form-control mr-sm-5"
												type="text"
												placeholder="Nama Tag Baru"
												name="newTag"
												style={{ width: '100%' }}
												onChange={(e)=>this.props.setInput(e)}
											/>
										</div>
										<div className='col-md-4'>
											<input
												className="input-search-component form-control mr-sm-5"
												type="text"
												placeholder="Masukkan Link Logo"
												name="newLogo"
												style={{ width: '100%' }}
												onChange={(e)=>this.props.setInput(e)}
											/>
										</div>
										<div className='col-md-2'>
											<button
												onClick={() => this.handlePostTag()}
												className="btn btn-info my-2 my-sm-0"
												type="submit"
												style={{ paddingLeft: '25px', paddingRight: '25px' }}
											>
												Tambahkan
											</button>
										</div>
										<div className='col-md-1'></div>
									</div>
								</form>
							</div>
						</div>
						<div className='row' style={{paddingTop:'30px', paddingBottom:'75px'}}>
							<table class="table table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nama Tag</th>
									<th>Logo Tag</th>
									<th>Pengguna Tag</th>			
									<th>Tangguhkan</th>	
								</tr>
							</thead>
							<tbody>
								{tags.map((tag,i)=>
									<tr>
										<td>{tag.tag_id}</td>
										<td>{tag.name}</td>
										<td>
											<img width='50px' height='50px' src={tag.photo_url} alt=""/>
										</td>
										<td>{tag.total_follower}</td>
										<td>
											<button className='btn btn-danger' style={{fontSize:'10px'}}>
										Delete
											</button>
										</td>
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
export default connect('menuBarUpload, allTag, isLoading', actions)(withRouter(AdminLandingPage));