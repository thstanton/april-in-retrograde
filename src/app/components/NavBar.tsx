export default function NavBar() {
  return (
    <nav className="flex w-full flex-row gap-8 absolute">
      <div>LOGO</div>
      <ul className="flex flex-row justify-between gap-8 font-display text-blue-900 text-xl">
        <li>RECIPES</li>
        <li>DECOR</li>
        <li>ACTIVITIES</li>
        <li>INSPIRATION</li>
        <li>GUIDES</li>
      </ul>
      <div className="grow"></div>
      <div className="">User Area</div>
    </nav>
  );
}
