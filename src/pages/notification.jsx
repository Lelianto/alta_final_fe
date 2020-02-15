import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/signUp.css';
import '../styles/css/home.css';
import { connect } from "unistore/react";
import { actions } from "../stores/store";
import Header from '../components/header';
import Footer from '../components/footer';

class Notification extends React.Component {
    state = {
        dates : ['Rabu, 3 Januari 2020', 'Selasa, 2 Januari 2020', 'Senin, 1 Januari 2020'],
        times : ['15:02', '20:43', '13:20'],
        notif : ['Lian menjawab pertanyaan Anda', 'Fadhil menjawab pertanyaan Lian', 'Ulfah mengomentari artikel anda'],
        questions : [ 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis eaque odio harum dolore?', 'Facilis, aspernatur incidunt at autem provident, porro quibusdam fugit dolorum ratione pariatur?', 'Unde esse voluptate fugit animi accusantium, optio totam ipsum, commodi veniam cumque sit? Aperiam?' ],
        answers: [ 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, odio. Tempore aspernatur a rem nam similique numquam maxime, odit, voluptate aliquam officiis qui nobis aliquid amet ea fuga ipsa iure!' ]
    }

    /**
	 * @function doSearch() handling searching
	 */
    doSearch = () => {
        this.props.history.push('/pencarian')
      }

	render() {

        const notifications = this.state.dates.map((date, index) => {
            return (
                <div className="border shadow-sm rounded bg-white pl-3 pr-3 py-3 mt-1 mb-3">
                        <div className="row">
                            <div className="col-md-11 text-left">
                                <p className='mb-0' style={{fontSize:'13px', color:'darkslategray'}}>{date}</p>
                                <p style={{fontSize:'13px', color:'darkslategray'}}>{this.state.times[index]}</p>
                            </div>
                            <div className="col-md-1">
                                <Link style={{textDecoration:'none'}}>
                                    <i className="material-icons" style={{fontSize:'28px'}}>delete</i>
                                </Link>
                            </div>
                        </div>
                        <div className="notif text-left">
                            <p>{this.state.notif[index]}</p>
                        </div>
                        <div className="text-left pl-3">
                            <h6><Link style={{textDecoration:'none'}}>{this.state.questions[index]}</Link></h6>
                        </div>
                        <div className="border pl-3 pr-3 py-3 ml-3 mr-3">
                            <p className="text-left">{this.state.answers}</p>
                        </div>
                </div>
            )
        })

		return (
			<React.Fragment>
				<Header doSearch={this.doSearch}/>
				<div className="container pt-5">
					<div className="row">
						<div className="col-lg-2 col-md-2 col-sm-1 col-1" />
						<div className="col-lg-8 col-md-8 col-sm-10 col-10 mt-5">
                            <div className="text-center">
                                <h4 style={{fontWeight : '700'}}>Pemberitahuan</h4>
                            </div>
							{notifications}
						</div>
					</div>
				</div>
			<Footer/>
		</React.Fragment>
		);
	}
}
export default connect('', actions)(withRouter(Notification));
