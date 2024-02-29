"use client";
import { Keyword } from "@prisma/client";
import { SpotifyPlaylistResponse } from "../lib/spotify/spotify";
import { addLink } from "./actions";

interface PlaylistFormProps {
    keywords: Keyword[];
    playlistData: SpotifyPlaylistResponse;
}

export default function PlaylistForm({ keywords, playlistData }: PlaylistFormProps) {
  return (
    <form action={addLink}>
      <input
        className="select select-bordered mb-3 w-full"
        name="category"
        defaultValue="Playlist"
        disabled
      />
      <input
        name="URL"
        defaultValue={playlistData.external_urls.spotify}
        className="input input-bordered mb-3 w-full"
        disabled
      />
      <input
        name="title"
        defaultValue={playlistData.name}
        className="input input-bordered mb-3 w-full"
        required
      />
      <input
        name="description"
        defaultValue={playlistData.description}
        className="input input-bordered mb-3 w-full"
      />
      <input
        name="site"
        defaultValue={playlistData.owner.display_name}
        className="input input-bordered mb-3 w-full"
        required
      />
      <input
        name="imageURL"
        defaultValue={playlistData.images[0].url}
        className="input input-bordered mb-3 w-full"
      />
      <input
        name="imageAltText"
        defaultValue="Playlist cover image"
        className="input input-bordered mb-3 w-full"
      />
      <h2>Keywords:</h2>
      <div className="flex h-48 flex-col flex-wrap">
        {keywords.map((keyword) => (
          <label
            className="label cursor-pointer justify-start gap-2"
            key={keyword.id}
          >
            <input
              type="checkbox"
              className="checkbox"
              name="keyword"
              value={keyword.id}
            />
            <span className="label-text">{keyword.title}</span>
          </label>
        ))}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
