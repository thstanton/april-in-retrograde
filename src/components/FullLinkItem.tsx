import Image from "next/image";
import { cloudinaryUrl } from "../lib/cloudinary/cloudinary";
import { LinkItem } from "@prisma/client";
import LikeButton from "./LikeButton";
import VisitLinkButton from "./VisitLinkButton";
import ShareButton from "./ShareButton";

interface FullLinkItemProps {
  linkItem: LinkItem;
}

export default function FullLinkItem({ linkItem }: FullLinkItemProps) {
  return (
    <div className="card card-side mb-3 max-h-fit w-full rounded-none">
      <figure className="">
        <Image
          src={`${cloudinaryUrl}${linkItem.imageURL}`}
          alt={linkItem.imageAltText}
          width={400}
          height={600}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title font-display">
          {linkItem.title.toUpperCase()}
        </h1>
        <p className="mb-3">{linkItem.description}</p>
        <p className="mb-3">From: {linkItem.site}</p>
        <div className="card-actions">
          <VisitLinkButton url={linkItem.URL} />
          <p>Visit</p>
          <LikeButton />
          <p>Save</p>
          <ShareButton url={linkItem.URL}/>
          <p>Share</p>
        </div>
      </div>
    </div>
  );
}
