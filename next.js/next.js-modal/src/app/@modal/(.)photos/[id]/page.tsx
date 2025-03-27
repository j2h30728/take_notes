import Image from "next/image";

import { fetchPixelsDetailPhoto } from "@/api/fetchers";
import Modal from "@/components/ui/Modal";

export default async function PhotoModal({ params: { id: photoId } }: { params: { id: string } }) {
  const { data } = await fetchPixelsDetailPhoto(photoId);
  return (
    <div>
      <div className="w-[800px] h-[800px] bg-white rounded-full  overflow-hidden grid grid-cols-3 ">
        <div className="flex  justify-center items-center text-2xl text-white bg-red-800 font-bold">
          {data.photographer}
        </div>
        <div className="relative w-auto h-auto col-span-2  object-center">
          <Image
            priority
            src={data.src.portrait}
            fill
            className="object-cover  object-center"
            sizes="33vw"
            alt={data.alt}
          />
        </div>
      </div>
    </div>
  );
}
