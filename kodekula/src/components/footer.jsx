import React from 'react';
import '../styles/css/footer.css';
import '../styles/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo-kodekula.png';

const Footer = ()=>{
    return (
    <footer>
        <nav class=" bg-light" style={{marginTop:'50px'}}>
            <Link className='logo-kodekula' to="#">
                <img style={{width:'15%', paddingTop:'20px', paddingBottom:'20px'}} src={logo} alt="img"/>
            </Link>
        </nav>
    </footer>
    )
}

export default Footer