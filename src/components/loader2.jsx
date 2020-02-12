import React from 'react';
import '../styles/css/loader2.css';
import '../styles/css/bootstrap.min.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';

const Loader2 = (props) => {
    return (
        <div class = "centered">
            <div class = "blob-1"></div>
            <div class = "blob-2"></div>
        </div>
    );
};

export default connect('', actions)(withRouter(Loader2));
