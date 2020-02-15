import React from 'react';
import '../styles/css/loader.css';
import '../styles/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../stores/store';

const Header = (props) => {
    return (
        <div>
            <div class="container loader-container">
                <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                    <circle cx="170" cy="170" r="160" stroke="#000099"/>
                    <circle cx="170" cy="170" r="135" stroke="#ff4f00"/>
                    <circle cx="170" cy="170" r="110" stroke="#55ffee"/>
                    <circle cx="170" cy="170" r="85" stroke="#f8e604"/>
                </svg>
            </div>
        </div>
    );
};

export default connect('', actions)(withRouter(Header));
