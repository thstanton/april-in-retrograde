"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { BoardSectionFull } from "@/lib/db/boardApi";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SelectedLinkItems } from "../BoardSectionForm";
import { revalidatePath } from "next/cache";

export async function handleSubmitBoardSection(
  formData: FormData,
  boardSection: BoardSectionFull | undefined,
  boardId: string,
  selectedLinkItems: SelectedLinkItems,
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
    return;
  }
  const title = formData.get("sectionTitle")?.toString();
  const body = formData.get("sectionBody")?.toString();
  const imageURL = formData.get("sectionImageURL")?.toString();
  const imageAltText = formData.get("sectionImageAltText")?.toString();

  if (!title || !body) {
    console.error("Missing required form data");
    return;
  }

  try {
    if (boardSection) {
    } else if (imageURL && imageAltText) {
      const newSection = await prisma.boardSection.create({
        data: {
          title,
          body,
          board: {
              connect: {
                id: boardId
              }
          },
          image: {
            create: {
              URL: imageURL,
              altText: imageAltText,
            },
          },
          linkItems: {
              connect: [
                {
                  id: selectedLinkItems.linkItem1?.id
                },
                {
                  id: selectedLinkItems.linkItem2?.id
                },
                {
                  id: selectedLinkItems.linkItem3?.id
                },
                {
                  id: selectedLinkItems.linkItem4?.id
                },
                {
                  id: selectedLinkItems.linkItem5?.id
                },
              ]
          }
        },
      });
      revalidatePath("/admin/board/" + boardId);
    } else {
      const newSection = await prisma.boardSection.create({
        data: {
          title,
          body,
          boardId,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}
