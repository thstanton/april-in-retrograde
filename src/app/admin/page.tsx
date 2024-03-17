import AdminMenu from "@/components/AdminMenu";
import Link from "next/link";

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
      
    </div>
  );
}
