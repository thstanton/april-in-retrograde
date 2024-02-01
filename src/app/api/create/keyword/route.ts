import { prisma } from "@/app/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const newKeywords: string[] = await req.json();
    const newKeywordsValidated = newKeywords.filter(async keyword => {
        const response = await prisma.keyword.findFirst({
            where: {
                title: keyword
            }
        })
        return !response
    })
    console.log(newKeywordsValidated)
    const data = newKeywordsValidated.map((keyword) => ({ title: keyword }));
    await prisma.keyword.createMany({
      data: data,
    });
    return Response.json({ status: 201 })
  } catch (error) {
    return Response.json({ status: 400 })
  }
}
