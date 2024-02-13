import Image from "next/image";
import { cloudinaryUrl } from "../lib/cloudinary/cloudinary";
import Link from "next/link";
import { LinkWithCategoryAndKeywords } from "../lib/db/linksApi";

interface FoodCardProps {
  linkItem: LinkWithCategoryAndKeywords;
}

export default function FoodCard({ linkItem }: FoodCardProps) {
  return (
    <Link href={linkItem.URL}>
      <div className="card card-bordered h-80 w-64 border-2 border-solid border-blue-900 bg-amber-50">
        <figure className="h-52 w-full">
          <Image
            src={`${cloudinaryUrl}${linkItem.imageURL}`}
            alt={linkItem.imageAltText}
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
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
