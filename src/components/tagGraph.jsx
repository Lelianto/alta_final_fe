import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios'
import Loader from './loader'
import { PieChart } from 'react-chartkick'
import 'chart.js'

class Chart extends Component {
    getAllTag = async () => {
        let menu =''
        if(store.getState().menu==='' || store.getState().menu===undefined){
            menu = localStorage.getItem('grafik')
        } else {
            menu = store.getState().menu
        }
        console.log('isi menu',menu)
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin"+menu,
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
            
	componentDidMount = ()=>{
		this.getAllTag()
    }
    
    render () {
        if(this.props.isLoading || this.props.allTag === [] || this.props.allTag === undefined || this.props.allTag === null){
            return (
                <div>
                    <Loader/>
                </div>
            )
        } else {
            const tags = this.props.allTag.query_data
            if(tags=== [] || tags == undefined){
                return (
                    <div>
                        <Loader/>
                    </div>
                )
            } else {
                const dataPoints = []
                tags.map((tag, i)=>{
                    const label = [tag.name,tag.tl_tag_count]
                    dataPoints.push(label)
                })
                return (
                    <div>
                        <PieChart data={dataPoints}/>
                    </div>
                )
            }
        }
    }
}

export default connect('allTag, isLoading', actions)(withRouter(Chart));

