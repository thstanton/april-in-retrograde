"use client";

import { Category, Keyword } from "@prisma/client";
import { useState } from "react";

interface LinkFormProps {
  categories: Category[];
  keywords: Keyword[];
}

export default function LinkForm({ categories, keywords }: LinkFormProps) {
  const [newKeywords, setNewKeywords] = useState("");
  const [allKeywords, setAllKeywords] = useState(keywords);

  async function addLink(formData: FormData) {
    const categoryId = formData.get("category")?.toString();
    const URL = formData.get("URL")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const site = formData.get("site")?.toString();
    const imageURL = formData.get("imageURL")?.toString();
    const keywordIds = formData.getAll("keyword");

    const link = {
      categoryId,
      URL,
      title,
      description,
      site,
      imageURL,
      keywordIds,
    };

    console.log(link);
  }

  async function addKeyword() {
    const newKeywordArr = newKeywords.split(", ");
    try {
        const response = await fetch('/api/create/keyword', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(newKeywordArr)
        })
        await response.json();
        if (response.status === 200) {
            const newKeywordResponse = await fetch('/api/keywords');
            const newKeywords = await newKeywordResponse.json();
            setAllKeywords(newKeywords);
        }
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <>
      <h1 className="text-xl">New link:</h1>
      <form action={addLink}>
        <label htmlFor="category" className="mb-3">
          Category:
        </label>
        <select className="select select-bordered mb-3 w-full" name="category">
          {categories &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
        </select>
        <input
          name="URL"
          placeholder="URL (or Spotify Playlist ID)"
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
        <h2>Keywords:</h2>
        <div className="flex flex-col flex-wrap">
          {allKeywords.map((keyword) => (
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
        <div className="mb-3">
          <input
            value={newKeywords}
            placeholder="New Keyword"
            className="textarea textarea-bordered"
            onChange={(e) => setNewKeywords(e.target.value)}
          />
          <button className="btn btn-neutral" onClick={addKeyword}>
            Add new keyword
          </button>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
