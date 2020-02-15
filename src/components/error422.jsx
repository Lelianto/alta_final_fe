import React from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/null.css';
import { Link } from 'react-router-dom'

const NotFound422 =()=> {
    return (
        <body>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>422</h1>
                        <h2 style={{fontSize:'10px'}}>Tidak dapat melakukan instruksi pada server. Silakan Login atau Ulangi kembali.</h2>
                    </div>
                    <Link to="/">Kembali ke Beranda</Link>
                </div>
            </div>
        </body>
    )

}

export default NotFound422
