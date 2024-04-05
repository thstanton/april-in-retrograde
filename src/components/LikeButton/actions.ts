"use server";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function userSave(userId: string, linkItemId: string) {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      savedLinkItems: {
        connect: {
          id: linkItemId,
        },
      },
    },
    include: {
      savedLinkItems: true,
    },
  });
  if (result) {
    revalidatePath(`/link/${linkItemId}`)
  }
}

export async function userUnsave(userId: string, linkItemId: string) {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      savedLinkItems: {
        disconnect: {
          id: linkItemId,
        },
      },
    },
    include: {
      savedLinkItems: true,
    },
  });
  if (result) {
    revalidatePath(`/link/${linkItemId}`)
  }
}
