import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu';
import Loader from '../components/loader'
// import Graph from '../components/columnBoxGraph';
import Graph from '../components/tagGraph'


class AdminLandingPage extends React.Component {
	handleChangePage = (event) => {
		console.log(event)
		this.props.history.push('/admin'+event)
	}
	handleChangePageMenu = (event) => {
		console.log(event)
		this.props.history.push('/admin'+event)
	}
	render() {
		if(this.props.allTag===null){
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
