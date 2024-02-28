"use client";
import { Session } from "next-auth";
import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { CiMenuKebab } from "react-icons/ci";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt="User avatar"
            width={40}
            height={40}
          />
        ) : (
          <CiMenuKebab />
        )}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 rounded-box p-2"
      >
          {user ? (
            <>
            <li>
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
            </li>
            <li>
            <Link href={"/create"}><button>Admin</button></Link>
            </li>
            </>
          ) : (
            <li>
            <button onClick={() => signIn()}>Sign In</button>
            </li>
          )}
        
      </ul>
    </div>
  );
}
