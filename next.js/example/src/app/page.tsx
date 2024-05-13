import { fetchPixelsPhotos } from "@/api/fetchers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data } = await fetchPixelsPhotos();

  return (
    <div className="w-full flex flex-col items-center">
      <div className=" w-fit grid grid-cols-3	">
        {data.photos.map((photo) => (
          <Link
            href={`photos/${photo.id}`}
            key={photo.id}
            scroll={false}
            className="w-[450px] h-[600px] flex relative cursor-pointer ">
            <Image src={photo.src.large} alt={photo.alt ?? ""} fill sizes="100vw" className=" object-cover h-auto" />
          </Link>
        ))}
      </div>
    </div>
  );
}
