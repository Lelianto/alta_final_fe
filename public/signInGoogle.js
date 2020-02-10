async function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    const pureUsername = profile.getEmail()
    const splitPureUsername = pureUsername.split('@')
    const username = splitPureUsername[0]
    console.log(username)
    console.log(profile)
    console.log('token', googleUser.getAuthResponse())
    localStorage.setItem('gmail_username', username)
    localStorage.setItem('gmail_email', profile.getEmail())
    localStorage.setItem('gmail_token', id_token)
    window.location.replace('http://localhost:3000/daftar')
}
