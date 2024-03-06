import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

interface VisitLinkButtonProps {
  url: string;
}

export default function VisitLinkButton({ url }: VisitLinkButtonProps) {
  return (
    <Link href={url} target="_blank">
      <div className="flex justify-center text-3xl">
        <FiExternalLink />
      </div>
    </Link>
  );
}
