"use server";

import fs from "fs/promises";
import { redirect } from "next/navigation";

import db from "@/utils/db";
import { productSchema } from "@/utils/schema";
import { getSession } from "@/utils/session";

export async function uploadProduct(_: unknown, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  if (session.id) {
    const product = await db.product.create({
      data: {
        photo: result.data.photo,
        title: result.data.title,
        price: result.data.price,
        description: result.data.description,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect(`/products/${product.id}`);
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
