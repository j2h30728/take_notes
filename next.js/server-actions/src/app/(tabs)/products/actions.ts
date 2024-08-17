"use server";

import db from "@/utils/db";

const LIMIT_NUMBER = 2;
export async function getProductByPage(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: LIMIT_NUMBER * (page - 1),
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export async function getProductCount() {
  return db.product.count();
}

export async function getPaginatedProducts(page: number) {
  const products = await getProductByPage(page);
  const PRODUCT_TOTAL_COUNT = await getProductCount();

  const isLastPage = PRODUCT_TOTAL_COUNT <= LIMIT_NUMBER * page;
  return { products, isLastPage };
}
