"use client";
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

export default function BoardSectionForm({
  boardSection,
  categories,
  linkItems,
}: BoardSectionFormProps) {
  const [filterValues, setFilterValues] = useState({
    sectionCategory: "",
    searchTerm: "",
  });
  const [selectedLinkItems, setSelectedLinkItems] = useState({
    linkItem1: boardSection?.linkItems[0]?.id,
    linkItem2: boardSection?.linkItems[1]?.id,
    linkItem3: boardSection?.linkItems[2]?.id,
    linkItem4: boardSection?.linkItems[3]?.id,
    linkItem5: boardSection?.linkItems[4]?.id,
  });

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
