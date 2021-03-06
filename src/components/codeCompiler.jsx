import React from 'react';
import '../styles/css/textArea.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';

class CodeCompiler extends React.Component {
    /**
	 * @function constructor() for code compiler function, for binding function, and state 
	 */
    constructor(props){
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    /**
	 * @function escFunction() handling 'enter' button for python code compiler
	 */
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

    /**
	 * @function componentDidMount() event listener 'enter' button 
	 */
    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    /**
	 * @function componentWillUnmount() event listener 'enter' button 
	 */
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        return (
            <div style={{marginBottom:'20px',marginTop:'20px'}}>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>Python Code Compiler</div>
                        <textarea name="" id="" cols='45' rows="10" value={this.props.wordCode} onChange={(e)=>this.escFunction(e)}></textarea>
                    </div>
                    <div className='col-md-12'>
                        <button className='btn btn-grad' onClick={()=>this.props.compileCode()}>Compile Code</button>
                    </div>
                    <div className='col-md-12'>
                        <div style={{marginTop:'20px',padding:'20px', backgroundColor:'white', borderRadius:'2px', marginLeft:'8px', marginRight:'8px'}}>
                            Hasil Compile Code :
                        </div>
                        {store.getState().codeCompilerResult === '' ?
                            <div className='container'>
                                <div class="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        :
                            <div style={{marginTop:'20px',padding:'20px', backgroundColor:'white', borderRadius:'2px', marginLeft:'8px', marginRight:'8px'}}>
                                {store.getState().codeCompilerResult}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect('wordCode, codeCompilerResult', actions)(withRouter(CodeCompiler));