"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ListProduct from "./list-product";
import { InitialProducts } from "@/app/(tabs)/products/page";
import { getPaginatedProducts } from "@/app/(tabs)/products/actions";

export default function ProductList({ initialProducts }: { initialProducts: InitialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchMoreTweet = async () => {
      const { products, isLastPage } = await getPaginatedProducts(page);
      setIsLastPage(isLastPage);
      setProducts(products);
    };
    fetchMoreTweet();
  }, [page]);

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        {products.map((product) => (
          <ListProduct key={product.id} {...product} />
        ))}
      </div>
      <div className="w-full max-w-screen-sm flex bottom-32 fixed mx-auto gap-10 items-center justify-center">
        <button
          className="disabled:text-stone-200"
          onClick={() => setPage((prev) => (prev === 1 ? prev : prev - 1))}
          disabled={page === 1}>
          <ChevronLeftIcon width={20} height={20} />
        </button>
        <span>{page}</span>
        <button
          className="disabled:text-stone-200"
          onClick={() => setPage((prev) => (isLastPage ? prev : prev + 1))}
          disabled={isLastPage}>
          <ChevronRightIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
