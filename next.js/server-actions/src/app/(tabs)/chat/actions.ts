"use server";

import postOpenAI from "@/service/aiService";
import { aiSchema } from "@/utils/schema";

export async function addChallenge(_: unknown, formData: FormData) {
  const content = formData.get("content");
  const result = aiSchema.safeParse(content);
  if (!result.success) return { data: null, error: result.error.flatten(), content };

  return { data: await postOpenAI({ description: result.data, imageUrl: null }), error: null, content };
}
