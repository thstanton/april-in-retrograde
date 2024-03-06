import { redirect } from "next/navigation";
import { prisma } from "../../lib/db/prisma";
import {
  extractSpotifyId,
  SpotifyPlaylistResponse,
  getPlaylist,
} from "../../lib/spotify/spotify";
import { CreatePageProps } from "./page";


export default async function LinkForm({ searchParams }: CreatePageProps) {
  const categories = await prisma.category.findMany();
  const keywords = await prisma.keyword.findMany();

  async function selectLinkType(formData: FormData) {
    "use server";
    const linkCategory = formData.get("category")?.toString();
    if (linkCategory) {
      redirect("/admin?category=" + linkCategory);
    }
  }

  async function getPlaylistData(formData: FormData) {
    "use server";
    const playlistURL = formData.get("URL")?.toString();
    try {
      if (playlistURL) {
        const playlistID = extractSpotifyId(playlistURL);
        const playlistData: SpotifyPlaylistResponse =
          await getPlaylist(playlistID);
        console.log(playlistData);
        if (playlistData) {
          redirect(
            "/admin?category=Playlist&URL=" +
              encodeURIComponent(playlistURL) +
              "&title=" +
              encodeURIComponent(playlistData.name) +
              "&description=" +
              encodeURIComponent(playlistData.description) +
              "&site=" +
              encodeURIComponent(playlistData.owner.display_name) +
              "&imageURL=" +
              encodeURIComponent(playlistData.images[0].url),
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async function addLink(formData: FormData) {
    "use server";
    const category = searchParams.category;
    const URL =
      searchParams.category === "Playlist"
        ? searchParams.URL
        : formData.get("URL")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const site = formData.get("site")?.toString();
    let imageURL = formData.get("imageURL")?.toString();
    let imageAltText = formData.get("imageAltText")?.toString();
    const keywords = formData.getAll("keyword") as string[];
    const newKeywords = formData.get("newKeywords")?.toString();

    // Add new keywords to keywords array
    const newKeywordArr = newKeywords?.split(", ");
    newKeywordArr?.forEach((keyword) => keywords.push(keyword));

    // If no image, add default image
    if (!imageURL) {
      switch (category) {
        case "Starter":
          imageURL =
            "https://assets.materialup.com/uploads/57a21feb-709a-43d0-8ba1-d066ccb48390/preview.jpg";
          imageAltText = "Default starter";
          break;
        case "Main":
          imageURL =
            "https://www.creativefabrica.com/wp-content/uploads/2020/10/12/Fast-Food-Illustration-Graphics-6009835-2-580x387.jpgDefault main image";
          imageAltText = "Default main";
          break;
        case "Dessert":
          imageURL =
            "data:image/jpeg;base64,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";
          imageAltText = "Default dessert";
          break;
        case "Playlist":
          imageURL =
            "https://t3.ftcdn.net/jpg/00/61/48/90/360_F_61489062_zJtIYg7i2oBRwaH208yYUs3hxej8tTSi.jpg";
          imageAltText = "Default playlist";
          break;
      }
    }

    if (
      !category ||
      !URL ||
      !title ||
      !description ||
      !site ||
      !imageURL ||
      !imageAltText ||
      !keywords
    ) {
      throw new Error("Missing fields");
    }

    const linkItem = await prisma.linkItem.create({
      data: {
        URL,
        title,
        description,
        site,
        imageURL,
        imageAltText,
        keywords: {
          connectOrCreate: keywords.map((keyword) => {
            return {
              where: { title: keyword },
              create: { title: keyword },
            };
          }),
        },
        category: {
          connect: {
            title: category,
          },
        },
      },
    });
    
  }

  return (
    <div className="p-6">
      <form action={selectLinkType}>
        <div className="flex w-full gap-2">
          <select className="select select-bordered mb-3 grow" name="category">
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
        </div>
      </form>
      {searchParams.category === "Playlist" && (
        <form id="fetchPlaylistForm" action={getPlaylistData}>
          <div className="flex w-full gap-2">
            <input
              name="URL"
              placeholder="Spotify Playlist URL"
              className="input input-bordered mb-3 grow"
              required
            />
            <button className="btn mb-3" type="submit">
              Fetch Playlist Info
            </button>
          </div>
        </form>
      )}
      {searchParams.category && (
        <form id="newLinkForm" action={addLink}>
          {searchParams.category !== "Playlist" && (
            <input
              name="URL"
              placeholder="Link URL"
              className="input input-bordered mb-3 w-full"
              required
            />
          )}
          <input
            name="title"
            placeholder={
              searchParams.category === "Playlist"
                ? "Playlist Name"
                : "Link Title"
            }
            defaultValue={searchParams.title}
            className="input input-bordered mb-3 w-full"
            required
          />
          <textarea
            name="description"
            rows={4}
            placeholder={
              searchParams.category === "Playlist"
                ? "Playlist Description"
                : "Link Description"
            }
            defaultValue={searchParams.description}
            className="textarea textarea-bordered mb-3 w-full"
          />
          <input
            name="site"
            placeholder={
              searchParams.category === "Playlist"
                ? "Playlist Creator"
                : "Original site or author"
            }
            defaultValue={searchParams.site}
            className="input input-bordered mb-3 w-full"
            required
          />
          <input
            name="imageURL"
            placeholder="Image URL"
            defaultValue={searchParams.imageURL}
            className="input input-bordered mb-3 w-full"
          />
          <input
            name="imageAltText"
            placeholder="Image Alt Text"
            defaultValue={
              searchParams.category === "Playlist"
                ? "Playlist cover image"
                : undefined
            }
            className="input input-bordered mb-3 w-full"
          />
          <div className="card card-bordered mb-3 bg-stone-100">
            <div className="card-body">
              <h2 className="card-title">Keywords:</h2>
              <div className="flex h-48 flex-col flex-wrap">
                {keywords.length ? (
                  keywords.map((keyword) => (
                    <label
                      className="label cursor-pointer justify-start gap-2"
                      key={keyword.id}
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        name="keyword"
                        value={keyword.title}
                      />
                      <span className="label-text">{keyword.title}</span>
                    </label>
                  ))
                ) : (
                  <p>No Keywords in Database</p>
                )}
              </div>
              <input
                name="newKeywords"
                placeholder="Add new keywords, seperated by commas and spaces eg. 'fun, spicy, Italian'"
                className="input input-bordered mb-3 w-full"
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
