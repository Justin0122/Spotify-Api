module.exports = {

    async execute(spotifySession, secure_token) {
        spotifySession.logout(secure_token).then(r => {
            console.log('Logged out of Spotify.');
        });
    }
}