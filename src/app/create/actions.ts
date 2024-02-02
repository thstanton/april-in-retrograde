"use server";
import { prisma } from "../lib/db/prisma";
import { revalidatePath } from "next/cache";
import { SpotifyPlaylistResponse, extractSpotifyId, getPlaylist } from "../lib/spotify/spotify";

export async function addKeyword(formData: FormData) {
  const newKeyword = formData.get("newKeyword")?.toString();
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

export async function validateNewKeyword(formData: FormData) {
  const keyword = formData.get("newKeyword")?.toString();
  console.log(keyword);
  const result = await prisma.keyword.findFirst({
    where: {
      title: keyword,
    },
  });
  return result;
}

export async function addLink(formData: FormData) {
  const categoryId = formData.get("category")?.toString();
  const URL = formData.get("URL")?.toString();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  let site = formData.get("site")?.toString();
  let imageURL = formData.get("imageURL")?.toString();
  const keywordIds = formData.getAll("keyword");
  
  // If new link is a playlist, call Spotify API to populate image field
  const playlistCategoryId = "65ad4dff097d36b934d20682";
  if (URL && categoryId === playlistCategoryId) {
    const spotifyId = extractSpotifyId(URL)
    try {
      const playlistData: SpotifyPlaylistResponse = await getPlaylist(spotifyId)
      console.log(playlistData)
      imageURL = playlistData.images[0]?.url
      site = 'Spotify'
    } catch (error) {
      console.error(error)
    }
    
  }
  if (!categoryId || !URL || !title || !description || !site || !imageURL || !keywordIds) {
    throw new Error ("Missing fields")
  }

  const link = {
    categoryId,
    URL,
    title,
    description,
    site,
    imageURL,
    keywordIds,
  };

  try {
    
  } catch (error) {
    
  }
}
