import React from 'react';
import '../styles/css/adminPage.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Header from '../components/headerAdmin';
import Footer from '../components/footer';
import AdminMenu from '../components/adminMenu'


class AdminLandingPage extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<AdminMenu/>
				<div className='container'>
					<div className='row' style={{paddingTop:'50px'}}>
						<div className='col-md-3'></div>
						
						<div className='col-md-3' style={{paddingLeft:'30px', paddingRight:'30px'}}>
							<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px',     border: '2px solid sandybrown'}}>
								Daftar User
							</div>
                    	</div>
						<div className='col-md-3' style={{paddingLeft:'30px', paddingRight:'30px'}}>
							<div className='box-control btn-warning' style={{paddingBottom:'25px', paddingTop:'25px'}}>
								Grafik User
							</div>
                    	</div>
						<div className='col-md-3'></div>
					</div>
				</div>
				<div className='container'>
					<div className='row' style={{paddingTop:'30px'}}>
						<table class="table table-bordered">
						<thead>
							<tr>
								<th>ID</th>
								<th>Username</th>
								<th>Nama Depan</th>
								<th>Nama Belakang</th>			
								<th>Email</th>
								<th>Pekerjaan</th>
								<th>Minat</th>
								<th>Tangguhkan</th>	
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>user.id</td>
								<td>user.username</td>
								<td>user.nama_depan</td>
								<td>user.nama_belakang</td>
								<td>user.email</td>
								<td>user.pekerjaan</td>
								<td>user.tangguhkan</td>
								<td>
									<button className='btn btn-danger' style={{fontSize:'10px'}}>
								Delete
									</button>
								</td>
							</tr>
						</tbody>
					</table>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect('menuBarUpload', actions)(withRouter(AdminLandingPage));
