import { Dispatch, SetStateAction } from "react";
import { SelectedLinkItems } from "@/app/admin/board/BoardSectionForm";
import { LinkWithCategoryAndKeywords } from "@/lib/db/linksApi";
interface BoardCreateBlankCardProps {
  id: string;
  setSelectedLinkItem: Dispatch<SetStateAction<SelectedLinkItems>>;
  selectedLinkItems: SelectedLinkItems;
  linkItems: LinkWithCategoryAndKeywords[];
}

export default function BoardCreateBlankCard({
  id,
  setSelectedLinkItem,
  selectedLinkItems,
  linkItems,
}: BoardCreateBlankCardProps) {
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const linkItemId = e.dataTransfer.getData("text");
    const linkItem = linkItems.find((linkItem) => linkItem.id === linkItemId);
    setSelectedLinkItem({
      ...selectedLinkItems,
      [id]: linkItem,
    });
    if (linkItem) linkItems.splice(linkItems.indexOf(linkItem), 1);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    (e.target as HTMLDivElement).classList.add("bg-amber-200");
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    (e.target as HTMLDivElement).classList.remove("bg-amber-200");
  }

  return (
    <div
      id={id}
      className="group/card card card-bordered h-52 w-40 border-2 border-dashed border-blue-900 bg-amber-50"
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <div className="card-body flex items-center justify-center text-6xl text-blue-900">
        +
      </div>
    </div>
  );
}
