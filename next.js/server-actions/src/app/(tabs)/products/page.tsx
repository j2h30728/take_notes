import { Prisma } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

import db from "@/utils/db";
import UploadProductForm from "@/components/upload-product-form";
import ProductList from "@/components/product-list";

export default async function MainPage() {
  const products = await getInitialProducts();

  return (
    <div className="p-5 flex flex-col gap-5 ">
      <UploadProductForm />
      <ProductList initialProducts={products} />
      <div className="max-w-screen-sm fixed bottom-24 mx-auto flex self-end">
        <Link
          href="/products/add"
          className="bg-rose-400 flex items-center justify-center rounded-full size-16 text-white transition-colors hover:bg-rose-300">
          <PlusIcon className="size-10" />
        </Link>
      </div>
    </div>
  );
}
async function getInitialProducts() {
  const products = db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 2,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;
