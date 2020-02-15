import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios';
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu'
import Graph from '../components/lineGraph';

class AdminLandingPage extends React.Component {
	handleChangePage = (event) => {
		console.log(event)
		localStorage.removeItem('grafik')
		this.props.history.push('/admin'+event)
	}
	handleChangePageMenu = (event) => {
		store.setState({
			menu:'/question'
		})
		localStorage.setItem('grafik', '/question')
		this.props.history.push('/admin'+event)
	}
	getAmount = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/chart/question",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            await axios(req)
                .then(function (response) {
					console.log('masuk')
					store.setState({ allData: response.data, isLoading:false})
					console.log('all data', store.getState().allData)
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
	render() {
		return (
			<React.Fragment>
				<Header />
				<AdminMenu handleChangePage={(event)=>this.handleChangePage(event)}/>
				<div className='container'>
					<div className='row' style={{paddingTop:'50px'}}>
						<div className='col-md-3'></div>
						
						<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
							<div onClick={()=>this.handleChangePageMenu('/pertanyaan')} className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px'}}>
								Daftar Pertanyaan
							</div>
                    	</div>
						<div className='col-md-2'>

						</div>
						<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
							<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px', border: '2px solid sandybrown'}}>
								Grafik Pertanyaan
							</div>
                    	</div>
						<div className='col-md-3'></div>
					</div>
				</div>
				<div className='container'>
					<div className='row' style={{paddingTop:'50px', paddingBottom:'75px'}}>
						<h4 style={{paddingBottom:'30px'}} className='col-md-12'>
							Total Pertanyaan terhadap Waktu
						</h4>
						<div className='col-md-2'></div>
						<div className='col-md-8' style={{backgroundColor:'white', borderRadius:'15px', padding:'20px'}} >
							<Graph/>
							<div className='row' style={{paddingTop:'20px', color:'grey'}}>
								<div className='col-md-2'>
								</div>
								<div className='col-md-4'>
									sumbu x : tanggal
								</div>
								<div className='col-md-4'>
									sumbu y : total pertanyaan
								</div>
								<div className='col-md-2'>
								</div>
							</div>
						</div>
						<div className='col-md-2'></div>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect('menuBarUpload', actions)(withRouter(AdminLandingPage));
