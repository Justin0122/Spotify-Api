

module.exports = {
    async execute(user) {
        console.log('Your Spotify information:');
        console.log('Display name: ' + user.display_name);
        console.log('Email: ' + user.email);
        console.log('Spotify URI: ' + user.uri);
        console.log('Link: ' + user.external_urls.spotify);
        console.log('Profile Image: ' + user.images[0].url);
        console.log('Country: ' + user.country);
        console.log('Product: ' + user.product);
        console.log('Followers: ' + user.followers.total);
    }

}