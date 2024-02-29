"use client";
import { useState } from "react";
import {
  SpotifyPlaylistResponse,
  extractSpotifyId,
  getPlaylist,
} from "../lib/spotify/spotify";

interface FetchPlaylistFormProps {
  setPlaylistData: React.Dispatch<
    React.SetStateAction<SpotifyPlaylistResponse | undefined>
  >;
}

export default function FetchPlaylistForm({ setPlaylistData }: FetchPlaylistFormProps) {
  const [playlistURL, setPlaylistUrl] = useState<string>();

  async function getPlaylistData() {
    try {
      if (playlistURL) {
        console.log(playlistURL)
        const playlistID = extractSpotifyId(playlistURL);
        console.log(playlistID)
        const playlistData: SpotifyPlaylistResponse =
          await getPlaylist(playlistID);
        console.log(JSON.stringify(playlistData))
        setPlaylistData(playlistData)
      }
    } catch (error) {
      console.error("This is the error: ", error)
    }
  }
  

  return (
    <form>
      <input
        name="URL"
        placeholder="Spotify Playlist URL"
        className="input input-bordered mb-3 w-full"
        onChange={e => setPlaylistUrl(e.target.value)}
        required
      />
      <button className="btn mb-3" onClick={getPlaylistData}>
        Fetch Playlist Info
      </button>
    </form>
  );
}
