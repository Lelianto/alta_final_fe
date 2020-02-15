async function onLogIn(googleUser){
    let profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    const pureUsername = profile.getEmail()
    const splitPureUsername = pureUsername.split('@')
    const username = splitPureUsername[0]
    console.log(username)
    console.log(profile)
    console.log('token', googleUser.getAuthResponse())
    if(localStorage.getItem('status')){
        localStorage.setItem('gmail_username', username)
        localStorage.setItem('gmail_email', profile.getEmail())
        localStorage.setItem('gmail_token', id_token)
        localStorage.setItem('google', true)
        localStorage.removeItem('status')
        window.location.replace('http://localhost:3000/masuk')
    }
}
