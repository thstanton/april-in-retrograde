"use client";
import BoardCreateBlankCard from "@/components/BoardCreateBlankCard";
import LinkItemCardCreateBoard from "@/components/LinkItemCardCreateBoard";
import { BoardSectionFull } from "@/lib/db/boardApi";
import { LinkWithCategoryAndKeywords } from "@/lib/db/linksApi";
import { Category } from "@prisma/client";
import { useState } from "react";

interface BoardSectionFormProps {
  boardSection?: BoardSectionFull;
  categories: Category[];
  linkItems: LinkWithCategoryAndKeywords[];
}

export interface SelectedLinkItems {
  linkItem1?: LinkWithCategoryAndKeywords | undefined;
  linkItem2?: LinkWithCategoryAndKeywords | undefined;
  linkItem3?: LinkWithCategoryAndKeywords | undefined;
  linkItem4?: LinkWithCategoryAndKeywords | undefined;
  linkItem5?: LinkWithCategoryAndKeywords | undefined;
}

export default function BoardSectionForm({
  boardSection,
  categories,
  linkItems,
}: BoardSectionFormProps) {
  const [filterValues, setFilterValues] = useState({
    sectionCategory: "",
    searchTerm: "",
  });
  const [selectedLinkItems, setSelectedLinkItems] = useState<SelectedLinkItems>(
    {
      linkItem1: boardSection?.linkItems[0],
      linkItem2: boardSection?.linkItems[1],
      linkItem3: boardSection?.linkItems[2],
      linkItem4: boardSection?.linkItems[3],
      linkItem5: boardSection?.linkItems[4],
    },
  );

  function handleFilter(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  }

  async function handleSubmit(formData: FormData) {}

  return (
    <div className="p-3">
      <form action={handleSubmit}>
        <input
          name="sectionTitle"
          placeholder="Starters"
          defaultValue={boardSection?.title}
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          name="sectionBody"
          placeholder="These starters are great because..."
          defaultValue={boardSection?.body}
          className="textarea textarea-bordered mb-3 w-full"
          rows={4}
        />
        <input
          name="sectionImageURL"
          placeholder="Section Image URL"
          defaultValue={boardSection?.image?.URL}
          className="input input-bordered mb-3 w-full"
        />
        <input
          name="sectionImageAltText"
          placeholder="Image Alt Text"
          defaultValue={boardSection?.image?.altText}
          className="input input-bordered mb-3 w-full"
        />
        <h2>Links</h2>
        <div className="flex flex-wrap gap-2">
          {selectedLinkItems.linkItem1 ? (
            <LinkItemCardCreateBoard
              linkItem={selectedLinkItems.linkItem1}
              selected
            />
          ) : (
            <BoardCreateBlankCard
              id="linkItem1"
              selectedLinkItems={selectedLinkItems}
              setSelectedLinkItem={setSelectedLinkItems}
              linkItems={linkItems}
            />
          )}
          {selectedLinkItems.linkItem2 ? (
            <LinkItemCardCreateBoard
              linkItem={selectedLinkItems.linkItem2}
              selected
            />
          ) : (
            <BoardCreateBlankCard
              id="linkItem2"
              selectedLinkItems={selectedLinkItems}
              setSelectedLinkItem={setSelectedLinkItems}
              linkItems={linkItems}
            />
          )}
          {selectedLinkItems.linkItem3 ? (
            <LinkItemCardCreateBoard
              linkItem={selectedLinkItems.linkItem3}
              selected
            />
          ) : (
            <BoardCreateBlankCard
              id="linkItem3"
              selectedLinkItems={selectedLinkItems}
              setSelectedLinkItem={setSelectedLinkItems}
              linkItems={linkItems}
            />
          )}
          {selectedLinkItems.linkItem4 ? (
            <LinkItemCardCreateBoard
              linkItem={selectedLinkItems.linkItem4}
              selected
            />
          ) : (
            <BoardCreateBlankCard
              id="linkItem4"
              selectedLinkItems={selectedLinkItems}
              setSelectedLinkItem={setSelectedLinkItems}
              linkItems={linkItems}
            />
          )}
          {selectedLinkItems.linkItem5 ? (
            <LinkItemCardCreateBoard
              linkItem={selectedLinkItems.linkItem5}
              selected
            />
          ) : (
            <BoardCreateBlankCard
              id="linkItem5"
              selectedLinkItems={selectedLinkItems}
              setSelectedLinkItem={setSelectedLinkItems}
              linkItems={linkItems}
            />
          )}
        </div>
        <label htmlFor="sectionCategory">Filter by Category:</label>
        <select
          name="sectionCategory"
          className="select select-bordered mb-3 w-full"
          value={filterValues.sectionCategory}
          onChange={(e) => handleFilter(e)}
        >
          <option disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <input
          name="searchTerm"
          className="input input-bordered mb-3 w-full"
          value={filterValues.searchTerm}
          onChange={(e) => handleFilter(e)}
          placeholder="Search..."
        />

        {linkItems
          .filter((linkItem) => {
            const categoryMatch =
              linkItem.categoryId === filterValues.sectionCategory;
            const searchTextMatch = linkItem.title
              .toLowerCase()
              .includes(filterValues.searchTerm.toLowerCase());
            return filterValues.sectionCategory.length
              ? categoryMatch && searchTextMatch
              : searchTextMatch;
          })
          .map((linkItem) => (
            <LinkItemCardCreateBoard key={linkItem.id} linkItem={linkItem} />
          ))}
        <button type="submit" className="btn btn-primary">
          Save Section
        </button>
      </form>
    </div>
  );
}
