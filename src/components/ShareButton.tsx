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
    <div className="dropdown">
      <button className={`flex justify-center text-3xl`}>
        <IoShareOutline />
      </button>
      <div className="card dropdown-content card-bordered w-72 bg-amber-50 border-solid border-blue-900 border-2">
        <div className="card-body">
          <h1 className="card-title">Share</h1>
          <div className="mb-3 flex flex-row gap-2">
            <input
              className="input input-bordered"
              disabled
              defaultValue={url}
            />
            <button className="btn btn-outline text-2xl" onClick={copyText}>
              <IoCopySharp />
            </button>
          </div>
          <Link href={`https://wa.me/?text=${url}`}>
            <button className="btn btn-circle btn-outline text-2xl">
              <FaWhatsapp />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
