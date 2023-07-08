module.exports = {

    async execute(spotifySession) {
        spotifySession.logout('123').then(r => {
            console.log('Logged out of Spotify.');
        });
    }
}