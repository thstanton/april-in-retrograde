import { authOptions } from "@/lib/auth/authOptions";
import { BoardWithKeywordsSectionsFull } from "@/lib/db/boardApi";
import { handleKeywordForm } from "@/lib/db/keywordApi";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface BoardFormProps {
  board?: BoardWithKeywordsSectionsFull;
}

export default async function BoardForm({ board }: BoardFormProps) {
  const keywords = await prisma.keyword.findMany({
    orderBy: {
      title: "asc",
    },
  });

  async function handleSubmit(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/api/auth/signin?callbackUrl=/admin");
      return;
    }

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const imageURL = formData.get("imageURL")?.toString();

    if (!title || !description || !imageURL) {
      console.error("Missing required form data");
      return;
    }

    const keywords = handleKeywordForm(formData);
    const authorId = session.user.id;

    try {
      if (board) {
        await prisma.board.update({
          where: { id: board?.id },
          data: {
            title,
            authorId,
            description,
            imageURL,
            keywords: {
              connectOrCreate: keywords.map((keyword) => ({
                where: { title: keyword },
                create: { title: keyword },
              })),
            },
          },
        });
      } else {
        const newBoard = await prisma.board.create({
          data: {
            title,
            authorId,
            description,
            imageURL,
            keywords: {
              connectOrCreate: keywords.map((keyword) => ({
                where: { title: keyword },
                create: { title: keyword },
              })),
            },
          },
        });
        redirect(`/admin/board/${newBoard.id}`);
      }
    } catch (error) {
      console.error("Error updating/creating board:", error);
    }
  }

  return (
    <div className="w-full p-3">
      <form className="flex flex-col gap-2" action={handleSubmit}>
        <input
          className="input input-bordered"
          placeholder="Board Title"
          defaultValue={board?.title}
          name="title"
        />
        <textarea
          className="textarea textarea-bordered"
          rows={3}
          placeholder="Board Description"
          defaultValue={board?.description || ''}
          name="description"
        />
        <input
          className="input input-bordered"
          placeholder="Image URL"
          defaultValue={board?.imageURL}
          name="imageURL"
        />
        <div className="card card-bordered mb-3 bg-stone-100">
          <div className="card-body">
            <h2 className="card-title">Keywords:</h2>
            <div className="flex h-48 flex-col flex-wrap">
              {keywords.length ? (
                keywords.map((keyword) => (
                  <label
                    className="label cursor-pointer justify-start gap-2"
                    key={keyword.id}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="keyword"
                      value={keyword.title}
                      defaultChecked={board?.keywords?.some(
                        (k) => k.title === keyword.title,
                      )}
                    />
                    <span className="label-text">{keyword.title}</span>
                  </label>
                ))
              ) : (
                <p>No Keywords in Database</p>
              )}
            </div>
            <input
              name="newKeywords"
              placeholder="Add new keywords, seperated by commas and spaces eg. 'fun, spicy, Italian'"
              className="input input-bordered mb-3 w-full"
            />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
