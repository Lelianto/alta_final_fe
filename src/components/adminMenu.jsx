import React from 'react';
import '../styles/css/header.css';
import '../styles/css/bootstrap.min.css';
import admin from '../images/admin.png';
import user from '../images/team.svg';
import article from '../images/content.svg';
import question from '../images/question.svg';
import answer from '../images/class.svg';
import tag from '../images/tag.svg';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { 
    actions, 
    store 
} from '../stores/store';
import axios from 'axios'

class AdminMenu extends React.Component {
    /**
	 * @function getAllTag() get all tag by all user, visitor, or admin
	 */
    getAllTag = async () => {
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
                store.setState({ allTag: response.data, isLoading:false})
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
    
    /**
	 * @function getAllUser() get all user datas by admin only
	 */
    getAllUser = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/user",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
        const self = this
        await axios(req)
            .then(function (response) {
                store.setState({ allUser: response.data, isLoading:false})
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
    
    /**
	 * @function getAllArticle() get all article datas by admin only
	 */
    getAllArticle = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/article",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
        const self = this
        await axios(req)
            .then(function (response) {
                store.setState({ allArticle: response.data, isLoading:false})
                console.log('all allArticle', store.getState().allArticle)
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
    
    /**
	 * @function getAllQuestion() get all question datas by admin only
	 */
    getAllQuestion = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/question",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            await axios(req)
                .then(function (response) {
                    store.setState({ allQuestion: response.data, isLoading:false})
                    console.log('all allQuestion', store.getState().allQuestion)
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
    
    /**
	 * @function getAllAnswer() get all answer datas by admin only
	 */
    getAllAnswer = async () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/answer",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            await axios(req)
                .then(function (response) {
                    store.setState({ allAnswer: response.data, isLoading:false})
                    console.log('all allAnswer', store.getState().allAnswer)
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
    
    /**
	 * @function componentWillMount() trigger all of the function above
	 */
    componentWillMount = ()=>{
        this.getAllTag()
        this.getAllUser()
        this.getAllArticle()
        this.getAllQuestion()
        this.getAllAnswer()
    }

    render(){
        return (
            <div className='container'>
                <div className='row' style={{paddingTop:'100px'}}>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-11 text-justify'>
                        <h1 style={{paddingLeft:'7px', paddingBottom:'30px'}}>
                            Hai, 
                            <img style={{width:'65px', height:'65px', marginLeft:'10px', marginRight:'10px'}} src={admin} alt=""/>
                            Admin 
                        </h1>
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/pengguna')} className='btn-glow' style={{paddingBottom:'20px', paddingTop:'20px', fontSize:'15px', paddingLeft:'0px', paddingRight:'0px'}}>
                            <img style={{width:'30px', height:'30px',  marginRight:'10px'}} src={user} alt=""/>
                            User
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/artikel')} className='btn-glow' style={{paddingBottom:'20px', paddingTop:'20px', fontSize:'15px', paddingLeft:'0px', paddingRight:'0px'}}>
                            <img style={{width:'30px', height:'30px',  marginRight:'10px'}} src={article} alt=""/>
                            Artikel
                        </div>   
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/pertanyaan')} className='btn-glow' style={{paddingBottom:'20px', paddingTop:'20px', fontSize:'15px', paddingLeft:'0px', paddingRight:'0px'}}>
                            <img style={{width:'30px', height:'30px',  marginRight:'10px'}} src={question} alt=""/>
                            Pertanyaan
                        </div>   
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/jawaban')} className='box-control btn-glow' style={{paddingBottom:'20px', paddingTop:'20px', fontSize:'15px', paddingLeft:'0px', paddingRight:'0px'}}>
                            <img style={{width:'30px', height:'30px',  marginRight:'10px'}} src={answer} alt=""/>
                            Jawaban
                        </div> 
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/tag')} className='box-control btn-glow' style={{paddingBottom:'20px', paddingTop:'20px', fontSize:'15px', paddingLeft:'0px', paddingRight:'0px'}}>
                            <img style={{width:'30px', height:'30px',  marginRight:'10px'}} src={tag} alt=""/>
                            Tag
                        </div> 
                    </div>
                    <div className='col-md-1'>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect('', actions)(withRouter(AdminMenu));
