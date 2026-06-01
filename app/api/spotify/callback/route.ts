// Spotify OAuth callback — not yet implemented.
export async function GET() {
  return Response.json(
    { error: "Not implemented", endpoint: "spotify/callback" },
    { status: 501 }
  );
}
