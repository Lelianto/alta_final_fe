import React from 'react';
import '../styles/css/header.css';
import '../styles/css/bootstrap.min.css';
import logo from '../images/NewLogo.png';
import user from '../images/user.png';
import notification from '../images/bell.png';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios'

class AdminMenu extends React.Component {
    getAllTag = async () => {
		console.log('masuk')
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
					console.log('masuk')
					store.setState({ allTag: response.data, isLoading:false})
					console.log('all tag', store.getState().allTag)
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
					console.log('all user', store.getState().allUser)
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
                            Hai, Admin
                        </h1>
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/pengguna')} className='box-control btn-grad' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            User
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/artikel')} className='box-control btn-glow' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            Artikel
                        </div>   
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/pertanyaan')} className='box-control btn-glow' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            Pertanyaan
                        </div>   
                    </div>
                    <div className='col-md-2'>
                        <div onClick={()=>this.props.handleChangePage('/jawaban')} className='box-control btn-sparkle' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
                            Jawaban
                        </div> 
                    </div>
                    <div className='col-md-2'>
    
                        <div onClick={()=>this.props.handleChangePage('/tag')} className='box-control btn-hot' style={{paddingBottom:'25px', paddingTop:'25px', fontSize:'15px'}}>
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
