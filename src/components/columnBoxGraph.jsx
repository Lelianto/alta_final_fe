import React, { Component } from 'react';
import CanvasJSReact from '../styles/js/canvasjs.react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import Loader from '../components/loader'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ColumnChart extends Component {
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
	componentDidMount = ()=>{
		this.getAllTag()
		}
	render() {
		if(this.props.isLoading){
			return(
				<div>
					<Loader/>
				</div>
			)
		} else {
			const tags = this.props.allTag.query_data
			const dataPoints = []
			tags.map((tag, i)=>{
				const label = {
					label:tag.name,
					y:tag.total_follower
				}
				dataPoints.push(label)
			})
			console.log(dataPoints)
			const options = {
				title: {
					text: "Perbandingan Penggunaan Tag"
				},
				animationEnabled: true,
				data: [
				{
					// Change type to "doughnut", "line", "splineArea", etc.
					type: "column",
					dataPoints: dataPoints
				}
				]
			}
			
			return (
			<div>
				<div style={{width:'725px', paddingTop:'50px'}}>
					<CanvasJSChart options = {options} 
						/* onRef={ref => this.chart = ref} */
					/>
				</div>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
			);
		}
	}
}

export default connect('allTag, isLoading', actions)(withRouter(ColumnChart));