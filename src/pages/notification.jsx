import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/signUp.css';
import '../styles/css/home.css';
import { connect } from "unistore/react";
import { actions, store } from "../stores/store";
import Header from '../components/header';
import Footer from '../components/footer';
import Moment from 'react-moment';
import { Markup } from 'interweave';
import Loader from '../components/loader';
import Axios from 'axios';

class Notification extends React.Component {
    /**
	 * @function doSearch() handling searching
	 */
    doSearch = () => {
        this.props.history.push('/pencarian')
      }

    putNotification = async (notifId, deleted) => {
        const parameters = {
            is_read : 1,
            deleted : deleted
        }
        const read = {
			method: 'put',
			url: store.getState().baseUrl+'/notification/'+notifId,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data : parameters
		};
        const readNotif = await Axios(read)
    };

    deleteNotification = async (notifId, deleted) => {
        await this.putNotification(notifId, deleted)
        const notifList = await this.props.notification.filter(notif => notif.id !== notifId)
        store.setState({notification : notifList})
    }
    
    goToDetailQuestion = async (postId, notifId, deleted) => {
        store.setState({
            userId: postId
        });
        await this.props.history.push('/pertanyaan/' + postId);
        await this.putNotification(notifId, deleted)
    }

	render() {
        const notifications = this.props.notification.map((item) => {
            const isRead = item.is_read
            let bgColor;
            if (!isRead){
                bgColor = '#88e1f2'
            } else {
                bgColor = 'white'
            }
            return (
                <div id={item.id} style={{backgroundColor : bgColor}} className="border shadow-sm rounded pl-3 pr-3 py-3 mt-1 mb-3">
                        <div className="row">
                            <div className="col-md-11 text-left">
                                <Moment className='mb-0' format='DD/MM/YYYY' style={{fontSize:'13px', color:'darkslategray'}}>{item.created_at}</Moment>
                                &nbsp;&nbsp;<Moment className='mb-0' format='HH:MM' style={{fontSize:'13px', color:'darkslategray'}}>{item.created_at}</Moment>
                            </div>
                            <div className="col-md-1">
                                <Link style={{textDecoration:'none', color:'black'}}>
                                    <i onClick={()=>this.deleteNotification(item.id, true)} className="material-icons" style={{fontSize:'28px'}}>delete</i>
                                </Link>
                            </div>
                        </div>
                        <div className="notif text-left">
                            <p>{item.message_content}</p>
                        </div>
                        <div className="text-left pl-3">
                            <h6><Link onClick={()=>this.goToDetailQuestion(item.tl_content.id, item.id, '')} style={{textDecoration:'none', color:'black', fontWeight:'bold', fontSize : '20px'}}>{item.tl_content.title}</Link></h6>
                        </div>
                        <div className="border pl-3 pr-3 py-3 ml-3 mr-3" style={{backgroundColor:'#ededed'}}>
                            <p className="text-left">
                                <Markup content={item.sl_content.html_content}/>
                            </p>
                        </div>
                </div>
            )
        })
		return (
			<React.Fragment>
				<Header doSearch={this.doSearch}/>
                {!this.props.notifLoading && this.props.notification !== [] ?
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
                :
                <div><Loader/></div>
                }
			<Footer/>
		</React.Fragment>
		);
	}
}
export default connect('notification, notifLoading', actions)(withRouter(Notification));
