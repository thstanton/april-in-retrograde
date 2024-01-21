// const categories = [
//   "Starter",
//   "Main",
//   "Dessert",
//   "Playlist",
//   "Extra",
//   "Activity ",
// ];

import { prisma } from "../lib/db/prisma";

export default async function page() {
  const categories = await prisma.category.findMany();
  const keywords = await prisma.keyword.findMany();

  async function addLink(formData: FormData) {
    const categoryId = formData.get("category")?.toString();
    const URL = formData.get("URL")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const site = formData.get("site")?.toString();
    const imageURL = formData.get("imageURL")?.toString();
  }
  return (
    <div>
      <h1>New link:</h1>
      <form action="">
        <select className="select select-bordered mb-3 w-full" name="category">
          {categories &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
        </select>
        <input
          name="URL (or Spotify Playlist ID)"
          placeholder="URL"
          className="input input-bordered mb-3 w-full"
          required
        ></input>
        <input
          name="title"
          placeholder="Title"
          className="input input-bordered mb-3 w-full"
          required
        ></input>
        <input
          name="description"
          placeholder="Description"
          className="input input-bordered mb-3 w-full"
        ></input>
        <input
          name="site"
          placeholder="Original site or author"
          className="input input-bordered mb-3 w-full"
          required
        ></input>
        <input
          name="imageURL"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full"
        ></input>
        <h2>Keywords:</h2>
        {keywords &&
          keywords.map((keyword) => (
              <label className="label cursor-pointer justify-start gap-2" key={keyword.id}>
                <input type="checkbox" className="checkbox" />
                <span className="label-text">{keyword.title}</span>
              </label>
          ))}
      </form>
      <button className="btn">Submit</button>
    </div>
  );
}
