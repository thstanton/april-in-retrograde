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
  linkItems
}: BoardCreateBlankCardProps) {
    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const linkItemId = e.dataTransfer.getData("text");
        const linkItem = linkItems.find((linkItem) => linkItem.id === linkItemId);
        setSelectedLinkItem({
            ...selectedLinkItems, [id]: linkItem
        })
    }

  return (
    <div
      id={id}
      className="group/card card card-bordered h-52 w-40 border-2 border-dashed border-blue-900 bg-amber-50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e)}
    >
      <div className="card-body flex items-center justify-center text-6xl text-blue-900">
        +
      </div>
    </div>
  );
}
