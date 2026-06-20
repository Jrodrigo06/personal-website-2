// Spotify OAuth — step 2 of the one-time bootstrap. Spotify redirects here with
// a ?code=, which we exchange for tokens. The refresh_token is returned so it
// can be pasted into .env.local as SPOTIFY_REFRESH_TOKEN (one-time dev use).
const TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return Response.json({ error }, { status: 400 });
  }
  if (!code) {
    return Response.json({ error: "Missing ?code" }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    return Response.json(
      { error: "Missing Spotify client credentials or redirect URI" },
      { status: 500 }
    );
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    return Response.json(
      { error: "Token exchange failed", details: data },
      { status: 502 }
    );
  }

  return Response.json({
    message:
      "Copy refresh_token into .env.local as SPOTIFY_REFRESH_TOKEN, then restart the dev server.",
    refresh_token: data.refresh_token,
  });
}
