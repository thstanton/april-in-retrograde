"use client";
import { Category, Keyword } from "@prisma/client";
import { addLink } from "./actions";
import * as React from "react";
import { SpotifyPlaylistResponse } from "../lib/spotify/spotify";
import FetchPlaylistForm from "./FetchPlaylistForm";
import PlaylistForm from "./PlaylistForm";

interface NewLinkFormProps {
  categories: Category[];
  keywords: Keyword[];
}

export default function NewLinkForm({
  categories,
  keywords,
}: NewLinkFormProps) {
  const [category, setCategory] = React.useState<string>();
  const [playlistData, setPlaylistData] =
    React.useState<SpotifyPlaylistResponse>();

  return (
    <>
      <select
        className="select select-bordered mb-3 w-full"
        name="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option></option>
        {categories &&
          categories.map((category) => (
            <option value={category.title} key={category.id}>
              {category.title}
            </option>
          ))}
      </select>
      {category === "Playlist" && (
        <FetchPlaylistForm setPlaylistData={setPlaylistData} />
      )}
      {playlistData && (
        <PlaylistForm keywords={keywords} playlistData={playlistData} />
      )}
      {category && category !== "Playlist" && (
        <form action={addLink}>
          <label htmlFor="category" className="mb-3">
            Category:
          </label>
          <select
            className="select select-bordered mb-3 w-full"
            name="category"
            defaultValue={category}
            disabled
          >
            {categories &&
              categories.map((category) => (
                <option value={category.title} key={category.id}>
                  {category.title}
                </option>
              ))}
          </select>
          <input
            name="URL"
            placeholder={
              category === "Playlist" ? "Spotify Playlist URL" : "Link URL"
            }
            className="input input-bordered mb-3 w-full"
            required
          />
          <input
            name="title"
            placeholder="Title"
            className="input input-bordered mb-3 w-full"
            required
          />
          <input
            name="description"
            placeholder="Description"
            className="input input-bordered mb-3 w-full"
          />
          <input
            name="site"
            placeholder="Original site or author"
            className="input input-bordered mb-3 w-full"
            required
          />
          <input
            name="imageURL"
            placeholder="Image URL"
            className="input input-bordered mb-3 w-full"
          />
          <input
            name="imageAltText"
            placeholder="Image Alt Text"
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
      )}
    </>
  );
}
