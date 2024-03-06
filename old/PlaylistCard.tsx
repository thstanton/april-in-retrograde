import Image from "next/image";
import { cloudinaryUrl } from "../src/lib/cloudinary/cloudinary";
import Link from "next/link";
import { LinkWithCategoryAndKeywords } from "../src/lib/db/linksApi";

interface PlaylistCardProps {
  linkItem: LinkWithCategoryAndKeywords;
}

export default function PlayListCard({ linkItem }: PlaylistCardProps) {
  return (
    <Link href={`/link/${linkItem.id}`}>
      <div className="card card-bordered mb-3 h-80 w-64 border-2 border-solid border-blue-900 bg-amber-50">
        <figure className="h-52 w-full">
          <div className="flex h-full w-full items-center justify-center bg-rose-200 object-cover">
            <Image
              src={`${cloudinaryUrl}${linkItem.imageURL}`}
              alt={linkItem.imageAltText}
              width={200}
              height={200}
              className="h-40 w-40 border-2 border-solid border-blue-900"
            />
          </div>
        </figure>
        <div className="absolute right-2 top-2 h-8 w-8 rounded-full border-2 border-solid border-blue-900 bg-amber-50"></div>
        <div className="border-t-2 border-blue-900 p-2">
          <h1 className="font-sans font-semibold text-blue-900">
            {linkItem.title.toUpperCase()}
          </h1>
          <p className="font-sans font-thin text-blue-900">
            {linkItem.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
