"use client";
import Image from "next/image";
import { cloudinaryClientUrl } from "../lib/cloudinary/cloudinary";
import { LinkWithCategoryAndKeywords } from "../lib/db/linksApi";

interface LinkItemCardCreateBoardProps {
  linkItem: LinkWithCategoryAndKeywords;
  selected?: boolean;
}

export default function LinkItemCardCreateBoard({
  linkItem,
  selected = false,
}: LinkItemCardCreateBoardProps) {
  const shortDescriptionLength = 60;
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text", linkItem.id)}
      className="group/card card card-bordered h-60 w-40 border-2 border-solid border-blue-900 bg-amber-50"
    >
      <figure className="h-52 w-full bg-rose-200">
        {linkItem.category.title === "Playlist" ? (
          <div className="flex h-full w-full items-center justify-center object-cover">
            <Image
              src={`${cloudinaryClientUrl}${linkItem.imageURL}`}
              alt={linkItem.imageAltText}
              width={200}
              height={200}
              className="h-40 w-40 border-2 border-solid border-blue-900"
            />
          </div>
        ) : (
          <Image
            src={`${cloudinaryClientUrl}${linkItem.imageURL}`}
            alt={linkItem.imageAltText}
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        )}
      </figure>
      {selected && (
        <button 
          className="btn btn-error absolute right-1 top-1 h-8 min-h-4 w-8 px-1 text-xl"
          >
          -
        </button>
      )}
      <div className="card-body border-t-2 border-blue-900 p-2">
        <h1 className="font-sans text-sm font-semibold text-blue-900">
          {linkItem.title.toUpperCase()}
        </h1>
        <p className="font-sans text-xs font-thin text-blue-900">
          {linkItem.description.length < shortDescriptionLength
            ? linkItem.description
            : linkItem.description.slice(0, shortDescriptionLength - 1) + "..."}
        </p>
      </div>
    </div>
  );
}
