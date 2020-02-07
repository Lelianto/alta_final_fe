import React from 'react';
import '../styles/css/header.css';
import '../styles/css/bootstrap.min.css';
import logo from '../images/NewLogo.png';
import user from '../images/user.png';
import notification from '../images/bell.png';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../stores/store';
import { Markup } from 'interweave';

const Accordion = (props) => {
    const giveComment = "<p><strong>Untuk memberikan komentar dan jawaban,</strong></p><p>1. User dapat mengupload gambar dengan menekan tombol yang tersedia, terdiri dari tombol pilih foto (choose file) dan upload (unggah foto), kemudian user dapat meng-copy&nbsp;foto yang muncul pada baris &#39;Link Gambar Artikel&#39; untuk di-paste ke dalam kolom komentar. Ini dilakukan agar user dapat dengan bebas mengatur lokasi penempatan gambar yang di-upload dari lokal komputer. Jika foto berasal dari cloud, copy file dari cloud dan paste-kan pada kolom komentar.</p><p>2. User dapat hanya memberikan komentar saja pada kolom komentar&nbsp;yang tersedia.</p><p>Selamat Berpendapat...</p>"
    const commentCulture = "<p><strong>Budayakan Sopan Santun,</strong></p><p>1. Dalam memberikan komentar ataupun jawaban, gunakan kalimat yang mudah dimengerti (bukan merupakan aksen daerah)</p><p>2. Gunakan kalimat yang sopan (Jika ditemukan komentar atau jawaban yang mengandung kalimat kasar atau SARA, makan akun tersebut akan disuspend)</p>"
    const codeExec = "<p><strong>Untuk mengeksekusi kode,</strong></p><p>1. Code compiler ini dirancang untuk code yang sederhana dan baru dapat mengompile python3 code.</p><p>2. Definisikan variabel di awal dan lakukan pencetakan hasil/return dari code tersebut.</p>"
	return(
		<div class="accordion" id="accordionExample" style={{marginTop:'20px', paddingLeft:'8px', paddingRight:'8px'}}>
            <div class="card">
                <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Petunjuk Memberikan Komentar
                    </button>
                </h2>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body text-justify">
                    <Markup content={giveComment}/>
                </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Budayakan Sopan Santun
                    </button>
                </h2>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body text-justify">
                    <Markup content={commentCulture}/>
                </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Petunjuk Compile Code (Laman Pertanyaan)
                    </button>
                </h2>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div class="card-body text-justify">
                    <Markup content={codeExec}/>
                </div>
                </div>
            </div>
        </div>
    )
};

export default connect('', actions)(withRouter(Accordion));
