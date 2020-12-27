const fetch = require('node-fetch')

const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const CLIENT_TOKEN = process.env.CLIENT_TOKEN
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?limit=5'


exports.handler = async (event, context) => {
  return getAccessToken()
    .then(result => { return getTopArtists(result.body) })
    .then(success => {
      // Tell netlify to cache this response if possible
      success.headers = {
        'Cache-Control': 'max-age=86400, public',
        'content-type': 'application/json'
      }
      return success
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
};

async function getAccessToken() {
  return fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': 'Basic ' + CLIENT_TOKEN
    },
    body: 'grant_type=refresh_token&refresh_token=' + REFRESH_TOKEN
  })
    .then(response => response.json())
    .then(data => ({ statusCode: 200, body: data.access_token }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
}

async function getTopArtists(accessToken) {
  return fetch(ARTISTS_ENDPOINT, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => ({ statusCode: 200, body: JSON.stringify(data.items) }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
}
