import Link from "next/link";

export default function AdminMenu() {
  return (
    <ul className="menu-xl menu menu-horizontal rounded-box bg-base-200">
      <li>
        <Link href={"/admin/link"}>Link</Link>
      </li>
      <li>
        <Link href={"/admin/board"}>Board</Link>
      </li>
    </ul>
  );
}
