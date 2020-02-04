import React from 'react';
import '../styles/css/textArea.css'
import CKEditor from "react-ckeditor-component";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { storage } from '../firebase'
import axios from 'axios'

class CodeCompiler extends React.Component {

    constructor(props){
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }
    escFunction(event){
        if(event.keyCode === 13) {
            store.setState({
                wordCode: event.target.value + ';'
            })
        }
        else {
            store.setState({
                wordCode: event.target.value
            })
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() {
        return (
            <div style={{marginBottom:'20px'}}>
                <div className='row'>
                    <div className='col-md-12'>
                        <textarea name="" id="" cols='50' rows="10" value={this.props.wordCode} onChange={(e)=>this.escFunction(e)}></textarea>
                    </div>
                    <div className='col-md-12'>
                        <button onClick={()=>this.props.codeCompiler()}>Compile Code</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect('wordCode', actions)(withRouter(CodeCompiler));