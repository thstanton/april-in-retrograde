import AdminMenu from "@/components/AdminMenu";

export default function page({ children }: {
  children: React.ReactNode;}) {
  return (
    <div>
      <div className="flex w-full justify-center">
        <AdminMenu />
      </div>
      {children}
    </div>
  );
}
