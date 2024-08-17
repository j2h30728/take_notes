import { getSession } from "@/utils/session";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/solid";
import db from "@/utils/db";
import { formatToWon } from "@/utils/utils";

async function getProducts(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}
async function getIsAuthor(userId: number) {
  const session = await getSession();
  if (session.id) return session.id === userId;

  return false;
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProducts(Number(params.id));
  return {
    title: product?.title,
  };
}
export default async function ProductDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await getProducts(id);
  if (!product) return notFound();
  const isAuthor = await getIsAuthor(product.userId);

  return (
    <div className="pb-36">
      <div className="relative aspect-square">
        <Image
          className="object-cover"
          fill
          src={product.photo.includes("imagedelivery") ? `${product.photo}/public` : product.photo}
          alt={product.title}
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full">
          {product.user.avatar !== null ? (
            <Image src={`${product.user.avatar}/avatar`} width={40} height={40} alt={product.user.username} />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-stone-200 flex justify-between items-center">
        <span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
        {isAuthor ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">Delete product</button>
        ) : null}
        <Link className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>
          채팅하기
        </Link>
      </div>
    </div>
  );
}
