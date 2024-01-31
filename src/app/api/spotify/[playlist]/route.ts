import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const token = cookies().get("spotify") || getToken();
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${params.slug}`,
    );
    console.log("Playlist: " + params.slug);
    return Response.json(token);
  } catch (error) {
    console.error(error);
  }
};

const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
  });
  const newToken: SpotifyTokenResponse = await response.json();
  cookies().set({
    name: "spotify",
    value: `${newToken.access_token}`,
    httpOnly: true,
  });
  return cookies().get("spotify");
};
