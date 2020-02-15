import React from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/null.css';
import { Link } from 'react-router-dom'

const NotFound401 = () => {
    return (
        <body>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>401</h1>
                        <h2 style={{fontSize:'10px'}}>Autorisasi Email atau Kata Sandi Invalid</h2>
                    </div>
                    <Link to="/">Kembali ke Beranda</Link>
                </div>
            </div>
        </body>
    )
}

export default NotFound401
