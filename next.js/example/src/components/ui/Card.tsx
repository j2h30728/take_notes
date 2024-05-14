import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

const Card = ({
  description,
  title,
  imageSrc,
}: {
  description: ReactNode;
  imageSrc: StaticImageData | string;
  title: string;
}) => {
  return (
    <div className="flex flex-col h-auto gap-3">
      <div className="w-[302px] h-[207px] overflow-hidden relative">
        <Image priority src={imageSrc} fill alt={title} sizes="33vw" className=" object-cover" />
      </div>
      {description}
    </div>
  );
};
export default Card;
