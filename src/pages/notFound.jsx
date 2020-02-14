import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/notFound.css'

class NotFound extends React.Component {

	render() {
        return (
            <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<Link to="/">Go To Homepage</Link>
		</div>
	</div>
        );
	}
}
export default (withRouter(NotFound));
