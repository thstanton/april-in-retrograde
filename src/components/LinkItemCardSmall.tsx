import Image from "next/image";
import { cloudinaryUrl } from "../lib/cloudinary/cloudinary";
import Link from "next/link";
import { LinkWithCategoryAndKeywords } from "../lib/db/linksApi";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import VisitLinkButton from "./VisitLinkButton";

interface LinkItemCardSmallProps {
  linkItem: LinkWithCategoryAndKeywords;
}

export default function LinkItemCardSmall({
  linkItem,
}: LinkItemCardSmallProps) {
  const shortDescriptionLength = 60;
  return (
    <div className="group/card card card-bordered h-80 w-64 border-2 border-solid border-blue-900 bg-amber-50">
      <figure className="h-52 w-full bg-rose-200">
        {linkItem.category.title === "Playlist" ? (
            <div className="flex h-full w-full items-center justify-center object-cover">
              <Image
                src={`${cloudinaryUrl}${linkItem.imageURL}`}
                alt={linkItem.imageAltText}
                width={200}
                height={200}
                className="h-40 w-40 border-2 border-solid border-blue-900"
              />
            </div>
        ) : (
            <Image
              src={`${cloudinaryUrl}${linkItem.imageURL}`}
              alt={linkItem.imageAltText}
              width={300}
              height={200}
              className="h-full w-full object-cover"
            />
        )}
      </figure>
      <div className="invisible absolute right-2 z-30 flex h-52 flex-col justify-evenly group-hover/card:visible">
        <LikeButton />
        <ShareButton />
        <VisitLinkButton url={linkItem.URL} />
      </div>
      <Link href={`/link/${linkItem.id}`}>
        <div className="border-t-2 border-blue-900 p-2">
          <h1 className="font-sans font-semibold text-blue-900">
            {linkItem.title.toUpperCase()}
          </h1>
          <p className="font-sans font-thin text-blue-900">
            {linkItem.description.length < shortDescriptionLength
              ? linkItem.description
              : linkItem.description.slice(0, shortDescriptionLength - 1) +
                "..."}
          </p>
        </div>
      </Link>
    </div>
  );
}
