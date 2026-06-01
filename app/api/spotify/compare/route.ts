// Spotify taste comparison — not yet implemented.
export async function GET() {
  return Response.json(
    { error: "Not implemented", endpoint: "spotify/compare" },
    { status: 501 }
  );
}
