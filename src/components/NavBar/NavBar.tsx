import { getServerSession } from "next-auth";
import UserMenuButton from "./UserMenuButton";
import { authOptions } from "@/lib/auth/authOptions";
import Link from "next/link";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="navbar flex w-full flex-row gap-8">
      <div><Link href={"/"}>LOGO</Link></div>
      <ul className="flex flex-row justify-between gap-8 font-display text-xl text-blue-900">
        <li>RECIPES</li>
        <li>DECOR</li>
        <li>ACTIVITIES</li>
        <li>INSPIRATION</li>
        <li>GUIDES</li>
      </ul>
      <div className="grow"></div>
      <UserMenuButton session={session} />
    </nav>
  );
}
