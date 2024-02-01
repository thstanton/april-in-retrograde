"use client";
import { useRef } from "react";
import { addKeyword, validateNewKeyword } from "./actions";

export default function NewKeywordForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      className="mb-3"
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        if (!validateNewKeyword(formData)) {
          await addKeyword(formData);
        }
      }}
    >
      <input
        name="newKeyword"
        placeholder="New Keyword"
        className="textarea textarea-bordered"
      />
      <button className="btn btn-neutral" type="submit">
        Add new keyword
      </button>
    </form>
  );
}
