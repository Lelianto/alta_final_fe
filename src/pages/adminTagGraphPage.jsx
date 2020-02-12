import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu';
import Loader from '../components/loader'
import axios from 'axios'
// import Graph from '../components/columnBoxGraph';
import Graph from '../components/tagGraph'


class AdminLandingPage extends React.Component {
	handleChangePage = (event) => {
		console.log(event)
		localStorage.removeItem('grafik')
		this.props.history.push('/admin'+event)
	}
	handleChangePageMenu = (event) => {
		store.setState({
			menu:'/tag'
		})
		localStorage.setItem('grafik', '/tag')
		this.props.history.push('/admin'+event)
	}
	getAmount = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/tag",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            await axios(req)
                .then(function (response) {
					console.log('masuk')
					store.setState({ allTag: response.data, isLoading:false})
					console.log('isi tag asli', store.getState().allTag)
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
		if(this.props.allTag===[] || this.props.allTag === undefined){
			return (
				<div>
					<Loader/>
				</div>
			)
		} else {
			return (
				<React.Fragment>
					<Header />
					<AdminMenu handleChangePage={(event)=>this.handleChangePage(event)}/>
					<div className='container'>
						<div className='row' style={{paddingTop:'50px'}}>
							<div className='col-md-3'></div>
							
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div onClick={()=>this.handleChangePageMenu('/tag')} className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px'}}>
									Daftar Tag
								</div>
							</div>
							<div className='col-md-2'>
	
							</div>
							<div className='col-md-2' style={{paddingLeft:'30px', paddingRight:'30px'}}>
								<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'12px', marginLeft:'-16px', marginRight:'-16px', border: '2px solid sandybrown'}}>
									Grafik Tag
								</div>
							</div>
							<div className='col-md-3'></div>
						</div>
					</div>
					<div className='container'>
						<div className='row' >
							<div style={{paddingTop:'50px'}} className='col-md-12'>
								<Graph/>
							</div>
						</div>
					</div>
					<Footer />
				</React.Fragment>
			);
		}
	}
}
export default connect('menuBarUpload, allTag', actions)(withRouter(AdminLandingPage));
