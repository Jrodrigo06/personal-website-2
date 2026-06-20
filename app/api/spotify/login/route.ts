// Spotify OAuth — step 1 of a one-time bootstrap to mint a refresh token.
// Visit /api/spotify/login locally, approve, and the callback returns the
// refresh_token to paste into .env.local as SPOTIFY_REFRESH_TOKEN.
const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SCOPE = "user-top-read";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return Response.json(
      { error: "Missing SPOTIFY_CLIENT_ID or SPOTIFY_REDIRECT_URI" },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPE,
  });

  return Response.redirect(`${AUTHORIZE_URL}?${params.toString()}`);
}
