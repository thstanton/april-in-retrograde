import Image from "next/image";

export default function PlayListCard() {
  return (
    <div className="card card-bordered mb-3 h-80 w-64 border-2 border-solid border-blue-900 bg-amber-50">
      <figure className="h-52 w-full">
        <div className="flex h-full w-full items-center justify-center bg-rose-200 object-cover">
          <Image
            src="https://mosaic.scdn.co/640/ab67616d0000b2733e0b07fedbc27e6d0d8e51ffab67616d0000b273a1b3d6ba2509233870c4bf25ab67616d0000b273de17893c581b6f4fbeba51e1ab67616d0000b273f05f2e283a0928ecc7e1e359"
            alt="Playlist"
            width={200}
            height={200}
            className="h-40 w-40 border-2 border-solid border-blue-900"
          />
        </div>
      </figure>
      <div className="absolute right-2 top-2 h-8 w-8 rounded-full border-2 border-solid border-blue-900 bg-amber-50"></div>
      <div className="border-t-2 border-blue-900 p-2">
        <h1 className="font-sans font-semibold text-blue-900">PLAYLIST</h1>
        <p className="font-sans font-thin text-blue-900">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
}
