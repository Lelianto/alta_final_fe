import React from 'react';
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
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect('menuBarUpload', actions)(withRouter(AdminLandingPage));
