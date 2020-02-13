import React from 'react';
import '../styles/css/loader2.css';
import '../styles/css/bootstrap.min.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';

const Loader2 = (props) => {
    return (
        <div className = "container">
            <div className="spinner-grow text-info"></div>
        </div>
    );
};

export default connect('', actions)(withRouter(Loader2));
