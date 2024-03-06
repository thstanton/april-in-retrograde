import Image from "next/image";
import { cloudinaryUrl } from "../lib/cloudinary/cloudinary";

export default function FeatureCard() {
  return (
    <div className="card card-side mb-3 max-h-fit w-full rounded-none bg-blue-900">
      <figure className="">
        <Image
          src={`${cloudinaryUrl}https://images.unsplash.com/photo-1593034509785-5b17ba49f683?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt="Picnic"
          width={400}
          height={600}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title font-display text-white">PICKY TEA</h1>
        <p className="text-white">
          Featured description Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Ad id temporibus architecto nesciunt distinctio quo
          libero hic illum sed odio doloribus necessitatibus.
        </p>
        <div className="card-actions">
          <button className="btn">Show me</button>
        </div>
      </div>
    </div>
  );
}
