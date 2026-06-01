// Spotify OAuth login — not yet implemented.
export async function GET() {
  return Response.json(
    { error: "Not implemented", endpoint: "spotify/login" },
    { status: 501 }
  );
}
