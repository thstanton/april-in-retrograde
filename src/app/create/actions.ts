"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db/prisma";

export async function addKeyword(formData: FormData) {
  const newKeyword = formData.get("newKeywords")?.toString();
  if (!newKeyword) throw Error("Enter new keyword");
  try {
    await prisma.keyword.create({
      data: {
        title: newKeyword,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}

export async function addLink(formData: FormData) {
  const categoryId = formData.get("category")?.toString();
  const URL = formData.get("URL")?.toString();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const site = formData.get("site")?.toString();
  const imageURL = formData.get("imageURL")?.toString();
  const keywordIds = formData.getAll("keyword");

  const link = {
    categoryId,
    URL,
    title,
    description,
    site,
    imageURL,
    keywordIds,
  };

  console.log(link);
}
