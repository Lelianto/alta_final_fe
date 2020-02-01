import React from 'react';
import '../styles/css/header.css';
import '../styles/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo-kodekula.png';

const Header = ()=>{
    return (
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link className='logo-kodekula' to="#">
                <img style={{width:'25%'}} src={logo} alt="img"/>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
                
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <div className='col-md-1'>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Artikel</Link>
                        </li>
                    </ul>
                </div>
                <div className='col-md-1'>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Pertanyaan</Link>
                        </li>
                    </ul>
                </div>
                <div className='col-md-7'>
                    <form class="search-component form-inline my-2 my-lg-0">
                        <div className='col-md-11' style={{ paddingRight:'0px'}}>
                            <input class="input-search-component form-control mr-sm-5" type="search" placeholder="Pencarian" style={{width:'100%'}}/>
                        </div>
                        <div className='col-md-1' style={{paddingLeft:'5px'}}>
                            <button class="btn btn-info my-2 my-sm-0" type="submit" style={{paddingLeft:'25px', paddingRight:'25px'}}>Cari</button>
                        </div>
                    </form>
                </div>
                <div className='col-md-1'>
                </div>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link" to="#">Daftar</Link>
                    </li>
                </ul>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link" to="#">Masuk</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    )
}

export default Header