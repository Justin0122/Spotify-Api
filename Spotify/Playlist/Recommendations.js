const ArrayShuffler = require("../../Utils/ArrayShuffler");
module.exports = {

    async execute(spotifySession) {

        const mostListened = await spotifySession.getTopTracks(50);
        const ids = mostListened.items.map(item => item.id);
        const likedSongs = await spotifySession.getLikedSongs(50);
        const likedSongIds = likedSongs.items.map((item) => item.track.id);
        const allIds = [...ids, ...likedSongIds];
        const shuffleArray = new ArrayShuffler();
        const shuffledIds = shuffleArray.shuffle(allIds);

        const playlist = await spotifySession.createRecommendationPlaylist(shuffledIds);

        const audioFeatures = await spotifySession.getAudioFeatures(playlist.tracks.items.map(item => item.track.id));
        const averageAudioFeatures = {
            acousticness: audioFeatures.reduce((acc, item) => acc + item.acousticness, 0) / audioFeatures.length,
            danceability: audioFeatures.reduce((acc, item) => acc + item.danceability, 0) / audioFeatures.length,
            energy: audioFeatures.reduce((acc, item) => acc + item.energy, 0) / audioFeatures.length,
            instrumentalness: audioFeatures.reduce((acc, item) => acc + item.instrumentalness, 0) / audioFeatures.length,
            liveness: audioFeatures.reduce((acc, item) => acc + item.liveness, 0) / audioFeatures.length,
            speechiness: audioFeatures.reduce((acc, item) => acc + item.speechiness, 0) / audioFeatures.length,
            valence: audioFeatures.reduce((acc, item) => acc + item.valence, 0) / audioFeatures.length,
        };
        const audioFeaturesDescription = Object.entries(averageAudioFeatures).map(([key, value]) => {
            const percentage = Math.round(value * 100);
            return `${key}: ${percentage}%`;
        }).join('\n');

        return {
            playlistName: playlist.name,
            playlistOwner: playlist.owner.display_name,
            playlistImage: playlist.images[0].url,
            playlistLink: playlist.external_urls.spotify,
            audioFeaturesDescription: audioFeaturesDescription
        }
    }
}