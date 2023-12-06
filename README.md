# Spotify API Integration with Node.js

This Node.js application integrates with the Spotify API, initially created for my Discord bot. It facilitates connecting users' Spotify accounts to perform diverse tasks like fetching user data, recommendations, playlists, and more.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Justin0122/Spotify-Api
   cd Spotify-Api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
    - Create a `.env` file based on `.env.example`.
    - Fill in the required Spotify API credentials and tokens.

4. Run the application:
   ```bash
   node index.js
   ```

## Dependencies

- [Express](https://www.npmjs.com/package/express): Minimalist web framework for Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Implements JSON Web Tokens for authentication.
- [Node-Spotify-API](https://github.com/thelinmichael/spotify-web-api-node): A Node.js wrapper for the Spotify Web API.

## Description

This Node.js application sets up an Express server to handle various endpoints for interacting with the Spotify API. It includes functionalities such as generating tokens, fetching user data, recommendations, playlists, current tracks, top tracks, artists, albums, and more.

## Usage

- `/user/generateToken`: Generates a JWT token using Spotify secure token.
- `/me`: Retrieves user information based on a secure token.
- `/recommendations`: Fetches recommended tracks for the user.
- `/playlist`: Retrieves playlists for a specific month and year.
- `/auth`: Authorizes the user based on the authorization code.
- `/logout`: Logs out the user by revoking the secure token.
- And more! Refer to the code for additional endpoints and functionalities.

## Important Notes

- Ensure you have the necessary Spotify API credentials and environment variables set up correctly to interact with the API.
- Handle errors and edge cases appropriately based on the Spotify API responses.

## References

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
