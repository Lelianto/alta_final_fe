import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import axios from 'axios';
import { LineChart } from 'react-chartkick';
import Loader from './loader';
import 'chart.js'

class Chart extends Component {
    /**
	 * @function getAmount() handle amount of users, questions, articles, and answers
	 */
    getAmount = async () => {
        let menu=''
        if(store.getState().menu==='' || store.getState().menu===undefined){
            menu = localStorage.getItem('grafik')
        } else {
            menu=store.getState().menu
        }
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/admin/chart"+menu,
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
        const self = this
        await axios(req)
            .then(function (response) {
                // console.log('masuk', response.data)
                store.setState({ allData: response.data, isLoading:false})
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
	 * @function componentDidMount() trigger function getAmount()
	 */
	componentDidMount = ()=>{
		this.getAmount()
    }
    
    render () {
        if(this.props.isLoading || this.props.allData ===[] || this.props.allData === undefined){
            return (
                <div>
                    <Loader/>
                </div>
            )
        } else {
            const datas = this.props.allData
            const dataPoints = []
            datas.map((data,i)=>{
                const label = [data.date,data.amount]
                dataPoints.push(label)
            })
            return (
                <div>
                    <LineChart data={dataPoints}/>
                </div>
            )
        }
    }
}

export default connect('allData, isLoading, menu', actions)(withRouter(Chart));

