"use server";
import { cookies } from "next/headers";

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyPlaylistResponse {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: {
      added_at: string;
      added_by: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      is_local: boolean;
      primary_color: string | null;
      track: {
        album: {
          album_type: string;
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            height: number;
            url: string;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          total_tracks: number;
          type: string;
          uri: string;
        };
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        episode: boolean;
        explicit: boolean;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track: boolean;
        track_number: number;
        type: string;
        uri: string;
      };
      video_thumbnail: {
        url: string | null;
      };
    }[];
    limit: number;
    next: string;
    offset: number;
    previous: number | null;
    total: number;
  };
  type: string;
  uri: string;
}

export const getPlaylist = async (
  id: string,
): Promise<SpotifyPlaylistResponse> => {
  try {
    const token = retrieveToken()
      ? (retrieveToken() as string)
      : ((await getToken()) as string);

    const response = await playlistFetch(id, token);

    // If response comes back OK, return it, otherwise fetch a new token and return it
    if (response.ok) {
      return response.json()
    } else {
      const newToken = await getToken() as string
      const refreshedResponse = await playlistFetch(id, newToken)
      return refreshedResponse.json()
    }
  } catch (error) {
    throw error
  }
};

const playlistFetch = async (id: string, token: string) => {
  return await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const retrieveToken = (): string | undefined => cookies().get("spotify")?.value;

const getToken = async (): Promise<string | undefined> => {
  // Fetch new token
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
  return retrieveToken();
};

export const extractSpotifyId = (url: string): string => {
  const validURL = url.match(/https:\/\/open.spotify.com\/playlist\//);
  if (validURL && validURL.index === 0) {
    return url.slice(34, 56);
  } else {
    throw new Error("Valid Spotify URL required");
  }
};
