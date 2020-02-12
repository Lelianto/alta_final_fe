import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios'
import Loader from '../components/loader';
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu'


class AdminLandingPage extends React.Component {
	handleChangePage = (event) => {
		console.log(event)
		localStorage.removeItem('grafik')
		this.props.history.push('/admin'+event)
	}
	handleChangePageMenu = (event) => {
		console.log(event)
		store.setState({
			menu:'/answer'
		})
		localStorage.setItem('grafik', '/answer')
		this.props.history.push('/admin'+event)
	}
	getAllAnswer = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/user",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            await axios(req)
                .then(function (response) {
                    store.setState({ allAnswer: response.data, isLoading:false})
                    console.log('all allAnswer', store.getState().allAnswer)
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

    componentWillMount = ()=>{
        this.getAllAnswer()
	}
	
	render() {
		if(this.props.isLoading || this.props.allAnswer===[]){
			return (
				<div>
					<Loader/>
				</div>
			)
		} else {
			const answers = this.props.allAnswer.query_data
			console.log('isi jawaban', answers)
			return (
				<React.Fragment>
					<Header />
					<AdminMenu handleChangePage={(event)=>this.handleChangePage(event)}/>
					<div className='container'>
						<div className='row' style={{paddingTop:'50px'}}>
							<div className='col-md-3'></div>
							
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', border: '2px solid sandybrown', marginLeft:'-16px', marginRight:'-16px'}}>
									Daftar Jawaban
								</div>
							</div>
							<div className='col-md-2'>
	
							</div>
							<div onClick={()=>this.handleChangePageMenu('/jawaban/grafik')} className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px'}}>
									Grafik Jawaban
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
											// onChange={props.setInput}
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
									<th>ID User</th>	
									<th>ID Pertanyaan</th>
									<th>Tanggal Jawab</th>
									<th>Hapus</th>	
								</tr>
							</thead>
							<tbody>
								{answers.map((answer,i)=>
									<tr>
										<td>{answer.id}</td>
										<td>{answer.user_id}</td>
										<td>{answer.parent_id}</td>
										<td>{answer.created_at}</td>
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
export default connect('menuBarUpload, isLoading, allAnswer', actions)(withRouter(AdminLandingPage));
