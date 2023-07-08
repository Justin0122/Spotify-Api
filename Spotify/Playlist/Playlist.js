module.exports = {

    async execute(spotifySession, month, year) {
        const playlistName = `Liked Songs from ${new Date(year, month - 1, 1).toLocaleString('en-US', {month: 'short'})} ${year}.`;
        const playlist = await spotifySession.createPlaylist(playlistName, month, year);

        return {
            playlistName: playlist.name,
            playlistOwner: playlist.owner.display_name,
            playlistImage: playlist.images[0].url,
            playlistLink: playlist.external_urls.spotify,
            totalTracks: playlist.tracks.total
        }
    }

}
