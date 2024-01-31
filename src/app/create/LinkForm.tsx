"use client";

import { Category, Keyword } from "@prisma/client";
import { useState } from "react";
import { addKeyword, addLink } from "./actions";

interface LinkFormProps {
  categories: Category[];
  keywords: Keyword[];
}

export default function LinkForm({ categories, keywords }: LinkFormProps) {
  const [newKeywords, setNewKeywords] = useState("");
  const [allKeywords, setAllKeywords] = useState(keywords);

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
        <div className="flex h-48 flex-col flex-wrap">
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
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <form className="mb-3" action={addKeyword}>
        <input
          name="newKeywords"
          placeholder="New Keyword"
          className="textarea textarea-bordered"
        />
        <button className="btn btn-neutral" type="submit">
          Add new keyword
        </button>
      </form>
    </>
  );
}
