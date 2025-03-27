import Image from "next/image";

import { fetchPixelsDetailPhoto } from "@/api/fetchers";

export default async function PhotoPage({ params: { id: photoId } }: { params: { id: string } }) {
  const { data } = await fetchPixelsDetailPhoto(photoId);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black bg-opacity-10">
      <div className="w-[800px] h-[800px] bg-white  mx-auto my-0 overflow-hidden grid grid-cols-3 ">
        <div className="flex  justify-center items-center text-2xl text-white bg-red-800 font-bold">
          {data.photographer}
        </div>
        <div className="relative w-auto h-auto col-span-2  object-center">
          <Image src={data.src.portrait} fill className="object-cover  object-center" sizes="33vw" alt={data.alt} />
        </div>
      </div>
    </div>
  );
}
