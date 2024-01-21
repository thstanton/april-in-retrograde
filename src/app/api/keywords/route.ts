import { prisma } from "@/app/lib/db/prisma";

export async function GET() {
  const response = await prisma.keyword.findMany();
  return Response.json(response);
}
