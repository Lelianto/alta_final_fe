function init() {
    gapi.load('auth2', function() {
    // Ready.
    gapi.auth2.init({client_id: 'deleted'});
    });
    }
function googleLogout() {
    // alert("googleLogout start");
    //gapi.auth2.getAuthInstance().signOut();
    //OR (both are same)
    console.log('isi gapi', gapi.auth2)
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            localStorage.removeItem('email')
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            localStorage.removeItem('google')
            localStorage.removeItem('loginGoogle')
            localStorage.clear()
            window.location.replace('https://kodekula.com/')
        });   
}  
