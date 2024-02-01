import Image from "next/image";

export default function FoodCard() {
  return (
    <div className="card card-bordered h-80 w-64 border-2 border-solid border-blue-900 bg-amber-50">
      <figure className="h-52 w-full">
        <Image
          src="https://images.unsplash.com/photo-1621327017866-6fb07e6c96ea?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Vol-au-vents"
          width={300}
          height={200}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="absolute right-2 top-2 h-8 w-8 rounded-full border-2 border-solid border-blue-900 bg-amber-50"></div>
      <div className="border-t-2 border-blue-900 p-2">
        <h1 className="font-sans font-semibold text-blue-900">VOL-AU-VENTS</h1>
        <p className="font-sans font-thin text-blue-900">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
}
