import { redirect } from "next/navigation";
import { prisma } from "../lib/db/prisma";
import { addLink } from "./actions";
import {
  extractSpotifyId,
  SpotifyPlaylistResponse,
  getPlaylist,
} from "../lib/spotify/spotify";

interface CreatePageProps {
  searchParams: { type: string };
}

export default async function page({ searchParams }: CreatePageProps) {
  const categories = await prisma.category.findMany();
  const keywords = await prisma.keyword.findMany();

  async function selectLinkType(formData: FormData) {
    "use server";
    const linkType = formData.get("category")?.toString();
    if (linkType) {
      redirect("/create?type=" + linkType);
    }
  }

  async function getPlaylistData(formData: FormData) {
    "use server";
    const playlistURL = formData.get("URL")?.toString();
    const playlistForm = new FormData()
    try {
      if (playlistURL) {
        const playlistID = extractSpotifyId(playlistURL);
        const playlistData: SpotifyPlaylistResponse =
          await getPlaylist(playlistID);
        console.log(playlistData);
        return playlistData;
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="p-6">
      <form action={selectLinkType}>
        <select className="select select-bordered mb-3 w-full" name="category">
          <option></option>
          {categories &&
            categories.map((category) => (
              <option value={category.title} key={category.id}>
                {category.title}
              </option>
            ))}
        </select>
        <button className="btn" type="submit">
          Select
        </button>
      </form>
      {searchParams.type === "Playlist" ? (
        <>
          <form id="fetchPlaylistForm" action={getPlaylistData}>
            <input
              name="URL"
              placeholder="Spotify Playlist URL"
              className="input input-bordered mb-3 w-full"
              required
            />
            <button className="btn mb-3" type="submit">
              Fetch Playlist Info
            </button>
          </form>
          <form id="playlistForm" action={addLink}>
            <input
              name="title"
              placeholder="Playlist Name"
              className="input input-bordered mb-3 w-full"
              required
            />
            <input
              name="description"
              placeholder="Playlist Description"
              className="input input-bordered mb-3 w-full"
            />
            <input
              name="site"
              placeholder="Playlist Creator"
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
        </>
      ) : (
        <p>Not playlist</p>
      )}
    </div>
  );
}
