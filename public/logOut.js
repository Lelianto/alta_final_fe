function init() {
    gapi.load('auth2', function() {
    // Ready.
    gapi.auth2.init({client_id: 'deleted'});
    });
    }
function googleLogout() {
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.removeItem('email')
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            localStorage.removeItem('google')
            localStorage.removeItem('loginGoogle')
            localStorage.clear()
            window.location.replace('https://kodekula.com/')
        });   
}  
