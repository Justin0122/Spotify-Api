const express = require('express');
const Dotenv = require('dotenv');
const SpotifySession = require('./Api/Spotify/Spotify');
const { execute: recommendationsExecute } = require('./Spotify/Playlist/Recommendations');
const { execute: playlistExecute } = require('./Spotify/Playlist/Playlist');
const { execute: authorizeExecute } = require('./Spotify/User/Authorize');
const { execute: logoutExecute } = require('./Spotify/User/Logout');
const {verify, sign} = require("jsonwebtoken");

Dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = "api.justinjongstra.nl";

const spotifySession = new SpotifySession(
    process.env.SPOTIFY_SECURE_TOKEN,
    process.env.SPOTIFY_API_URL,
    process.env.SPOTIFY_REDIRECT_URI,
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
);

function sendError(res) {
    res.send({ error: 'Invalid access token or refresh token.' });
}

app.post("/user/generateToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    let token = sign({ spotifySecureToken: process.env.SPOTIFY_SECURE_TOKEN }, jwtSecretKey);
    res.send(token);
});

function verifyToken(req, res, next) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let token = req.headers.authorization;
    if (token) {
        token = token.split(" ")[1];
        verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                res.send({ error: "Invalid token" });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.send({ error: "No token provided" });
    }
}

app.get("/me", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                res.send(user);
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get('/recommendations', (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => recommendationsExecute(spotifySession))
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.send(error);
            });
    } else {
        sendError(res);
    }
});

app.get('/playlist', (req, res) => {
    if (req.query.secure_token && req.query.month && req.query.year) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => playlistExecute(spotifySession, req.query.month, req.query.year))
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.send(error);
            });
    } else {
        sendError(res);
    }
});

app.get('/auth', (req, res) => {
    if (req.query.code) {
        authorizeExecute(req.query.code)
            .then((data) => {
                res.send(data);
            })
            .catch(() => {
                sendError(res);
            });
    }
});

app.get('/logout', (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then(() => logoutExecute(spotifySession, req.query.secure_token))
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.send(error);
            });
    } else {
        sendError(res);
    }
});

app.get("/current", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                spotifySession
                    .getCurrentlyPlaying()
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/tracks/top", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                spotifySession
                    .getTopTracks(req.query.amount || 5)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/artists/top", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                spotifySession
                    .getTopArtists(req.query.amount || 5)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/tracks/liked", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                spotifySession
                    .getLikedTracks(req.query.amount || 5)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/tracks/recent", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                spotifySession
                    .getRecentlyPlayed(req.query.amount || 5)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/albums/new", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                spotifySession
                    .getNewReleases(req.query.amount || 5, req.query.country || "US")
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/albums/liked", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then((user) => {
                spotifySession
                    .getLikedAlbums(req.query.amount || 5)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            }
            )
            .catch(() => {
                sendError(res);
            }
            );
    } else {
        sendError(res);
    }
});

app.get("/artists/liked", verifyToken, (req, res) => {
    if (req.query.secure_token) {
        spotifySession
            .getUser(req.query.secure_token)
            .then(() => {
                spotifySession
                    .getLikedArtists(req.query.amount || 5)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                            res.send(error);
                        });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/artists/top/tracks", verifyToken, (req, res) => {
    if (req.query.secure_token && req.query.artist_id) {
        spotifySession
            .getUser(req.query.secure_token)
            .then(() => {
                spotifySession
                    .getTopTracksByArtist(req.query.artist_id, req.query.amount || 5, req.query.country || "US")
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                            res.send(error);
                        });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/playlists/liked", verifyToken, (req, res) => {
    if (req.query.secure_token && req.query.user_id) {
        spotifySession
            .getUser(req.query.secure_token)
            .then(() => {
                spotifySession
                    .getLikedPlaylists(req.query.amount || 5)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                            res.send(error);
                        });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});

app.get("/tracks/current", verifyToken, (req, res) => {
    if (req.query.secure_token && req.query.user_id) {
        spotifySession
            .getUser(req.query.secure_token)
            .then(() => {
                spotifySession
                    .getCurrentTrack()
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                            res.send(error);
                        });
            })
            .catch(() => {
                sendError(res);
            });
    } else {
        sendError(res);
    }
});



app.listen(port, () => {
    console.log(`Server running at https://${host}:${port}/`);
});