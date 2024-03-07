"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoCopySharp, IoShareOutline } from "react-icons/io5";

interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  function copyText() {
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="dropdown dropdown-end relative">
      <div
        tabIndex={0}
        role="button"
        className={`flex justify-center text-3xl`}
      >
        <IoShareOutline />
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content card-bordered left-0 z-[1] w-fit origin-top-left border-2 border-solid border-blue-900 bg-amber-50"
      >
        <div className="card-body">
          <h1 className="card-title">Share</h1>
          <div className="mb-3 flex flex-row gap-2">
            <input
              className="input input-bordered"
              disabled
              defaultValue={`${process.env.NEXT_PUBLIC_BASE_URL}${url}`}
            />
            <button className="btn btn-outline text-2xl" onClick={copyText}>
              <IoCopySharp />
            </button>
          </div>
          <Link href={`whatsapp://send?text=${url}`} data-action="share/whatsapp/share">
            <button className="btn btn-circle btn-outline text-2xl">
              <FaWhatsapp />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
