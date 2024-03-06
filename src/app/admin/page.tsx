import LinkForm from "./LinkForm";

export interface CreatePageProps {
  searchParams: {
    category: string;
    URL: string;
    title: string;
    description: string;
    site: string;
    imageURL: string;
  };
}

export default function page({ searchParams }: CreatePageProps) {
  return (
    <div>
      <LinkForm searchParams={searchParams} />
    </div>
  );
}
