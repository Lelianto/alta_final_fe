import React, { Component } from 'react';
import CanvasJSReact from '../styles/js/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ColumnChart extends Component {
		render() {
		const options = {
			title: {
				text: "Perbandingan Penggunaan Tag"
			},
			animationEnabled: true,
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "ReactJS",  y: 10  },
					{ label: "VueJS", y: 15  },
					{ label: "NextJS", y: 25  },
					{ label: "Javascript",  y: 30  },
					{ label: "NuxtJS",  y: 28  },
					{ label: "MySQL",  y: 30  },
					{ label: "MongoDB", y: 25  },
					{ label: "Redis", y: 15  },
					{ label: "Flask",  y: 20  },
					{ label: "Python",  y: 22  }
				]
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

export default ColumnChart;