import React from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/null.css';

const NullNotification =()=> {
    return (
        <body>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Kosong</h1>
                        <h2 style={{fontSize:'10px'}}>Tidak ada pemberitahuan</h2>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default NullNotification
