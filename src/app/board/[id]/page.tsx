import CardGrid from "@/components/CardGrid";
import { cloudinaryUrl } from "@/lib/cloudinary/cloudinary";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";

interface BoardPageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: BoardPageProps) {
  const linkItems = await prisma.linkItem.findMany({
    include: {
      category: true,
      keywords: true,
    },
  });

  return (
    <div>
      <div className="bg-[url('https://assets-global.website-files.com/6408d629de5aef8ce5e31f88/6446828d9e09e6f2f3368307_italian-dinner-blog.webp')] bg-cover">
        <div className="flex h-64 w-full flex-col items-center justify-center bg-slate-700/25 text-white">
          <h1 className="mb-3 font-display text-5xl">ITALIAN NIGHT</h1>
          <h2 className="w-3/4 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem vitae corrupti amet quisquam, iure expedita
            praesentium? Possimus sequi quibusdam culpa dolores vitae nesciunt
            autem numquam? Facilis delectus quibusdam earum voluptatem?
          </h2>
        </div>
      </div>
      <section>
        <div className="flex gap-4 px-36 py-10">
          <Image
            src={`${cloudinaryUrl}https://www.sanpellegrino.com/sites/g/files/xknfdk1986/files/bruschetta_h_12.jpg`}
            className="object-cover"
            width={200}
            height={200}
            alt="Starter"
          />
          <div>
            <h1 className="mb-5 text-xl font-semibold">Starters</h1>
            <p className="text-">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              amet ea iusto suscipit itaque. Numquam quidem itaque voluptatem
              temporibus deleniti harum velit dolorem ex rerum possimus quaerat,
              nam ratione praesentium?
            </p>
          </div>
        </div>
        <CardGrid title="Starters" linkItems={linkItems} />
      </section>
      <section>
        <div className="flex gap-4 px-36 py-10">
          <Image
            src={`${cloudinaryUrl}https://www.sanpellegrino.com/sites/g/files/xknfdk1986/files/bruschetta_h_12.jpg`}
            className="object-cover"
            width={200}
            height={200}
            alt="Starter"
          />
          <div>
            <h1 className="mb-5 text-xl font-semibold">Mains</h1>
            <p className="text-">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              amet ea iusto suscipit itaque. Numquam quidem itaque voluptatem
              temporibus deleniti harum velit dolorem ex rerum possimus quaerat,
              nam ratione praesentium?
            </p>
          </div>
        </div>
        <CardGrid title="Mains" linkItems={linkItems} />
      </section>
      <section>
        <div className="flex gap-4 px-36 py-10">
          <Image
            src={`${cloudinaryUrl}https://www.sanpellegrino.com/sites/g/files/xknfdk1986/files/bruschetta_h_12.jpg`}
            className="object-cover"
            width={200}
            height={200}
            alt="Starter"
          />
          <div>
            <h1 className="mb-5 text-xl font-semibold">Desserts</h1>
            <p className="text-">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              amet ea iusto suscipit itaque. Numquam quidem itaque voluptatem
              temporibus deleniti harum velit dolorem ex rerum possimus quaerat,
              nam ratione praesentium?
            </p>
          </div>
        </div>
        <CardGrid title="Desserts" linkItems={linkItems} />
      </section>
      <section>
        <div className="flex gap-4 px-36 py-10">
          <Image
            src={`${cloudinaryUrl}https://www.sanpellegrino.com/sites/g/files/xknfdk1986/files/bruschetta_h_12.jpg`}
            className="object-cover"
            width={200}
            height={200}
            alt="Starter"
          />
          <div>
            <h1 className="mb-5 text-xl font-semibold">Music</h1>
            <p className="text-">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              amet ea iusto suscipit itaque. Numquam quidem itaque voluptatem
              temporibus deleniti harum velit dolorem ex rerum possimus quaerat,
              nam ratione praesentium?
            </p>
          </div>
        </div>
        <CardGrid title="Playlists" linkItems={linkItems} />
      </section>
      <section>
        <div className="flex gap-4 px-36 py-10">
          <Image
            src={`${cloudinaryUrl}https://www.sanpellegrino.com/sites/g/files/xknfdk1986/files/bruschetta_h_12.jpg`}
            className="object-cover"
            width={200}
            height={200}
            alt="Starter"
          />
          <div>
            <h1 className="mb-5 text-xl font-semibold">Table Decoration</h1>
            <p className="text-">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              amet ea iusto suscipit itaque. Numquam quidem itaque voluptatem
              temporibus deleniti harum velit dolorem ex rerum possimus quaerat,
              nam ratione praesentium?
            </p>
          </div>
        </div>
        <CardGrid title="Table Decorations" linkItems={linkItems} />
      </section>
      <section>
        <div className="flex gap-4 px-36 py-10">
          <Image
            src={`${cloudinaryUrl}https://www.sanpellegrino.com/sites/g/files/xknfdk1986/files/bruschetta_h_12.jpg`}
            className="object-cover"
            width={200}
            height={200}
            alt="Starter"
          />
          <div>
            <h1 className="mb-5 text-xl font-semibold">Extras</h1>
            <p className="text-">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              amet ea iusto suscipit itaque. Numquam quidem itaque voluptatem
              temporibus deleniti harum velit dolorem ex rerum possimus quaerat,
              nam ratione praesentium?
            </p>
          </div>
        </div>
        <CardGrid title="Extras" linkItems={linkItems} />
      </section>
    </div>
  );
}
