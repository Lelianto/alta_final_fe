async function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    const pureUsername = profile.getEmail()
    const splitPureUsername = pureUsername.split('@')
    const username = splitPureUsername[0]
    if(localStorage.getItem('status')){
        localStorage.setItem('gmail_username', username)
        localStorage.setItem('gmail_email', profile.getEmail())
        localStorage.setItem('gmail_token', id_token)
        localStorage.setItem('google', true)
        localStorage.removeItem('status')
        window.location.replace('https://kodekula.com/daftar')
    }
}