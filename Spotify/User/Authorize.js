module.exports = {

    async execute() {
        console.log('https://accounts.spotify.com/authorize?client_id=' + process.env.SPOTIFY_CLIENT_ID + '&response_type=code&redirect_uri=' + process.env.SPOTIFY_REDIRECT_URI + '&scope=user-read-email%20user-read-private%20user-library-read%20user-top-read%20user-read-recently-played%20user-read-currently-playing%20user-follow-read%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20playlist-read-collaborative%20user-library-modify&state=123');
    }
}