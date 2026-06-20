// Server-side Spotify access for the home page's "top tracks" section.
//
// Uses the refresh-token flow: a one-time-authorized refresh token
// (SPOTIFY_REFRESH_TOKEN, minted via /api/spotify/login → callback) is exchanged
// for a short-lived access token on each request, then used to read the owner's
// top tracks. No per-visitor OAuth. Results are revalidated hourly (ISR).

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks";

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  url: string;
}

interface SpotifyApiTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  external_urls: { spotify: string };
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn("[spotify] missing client credentials or refresh token");
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.warn(`[spotify] token refresh failed: ${res.status}`);
    return null;
  }

  const data = await res.json();
  return data.access_token ?? null;
}

export async function getTopTracks(limit = 5): Promise<SpotifyTrack[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const params = new URLSearchParams({
    limit: String(limit),
    time_range: "short_term", // ~last 4 weeks
  });

  const res = await fetch(`${TOP_TRACKS_URL}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 }, // hourly ISR
  });

  if (!res.ok) {
    console.warn(`[spotify] top tracks fetch failed: ${res.status}`);
    return [];
  }

  const data: { items?: SpotifyApiTrack[] } = await res.json();
  return (data.items ?? []).map((t) => ({
    id: t.id,
    name: t.name,
    artist: t.artists.map((a) => a.name).join(", "),
    album: t.album.name,
    albumImageUrl: t.album.images[1]?.url ?? t.album.images[0]?.url ?? "",
    url: t.external_urls.spotify,
  }));
}
