import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // Check if role is admin
  // This accesses the user's publicMetadata directly from the Clerk API response
  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    redirect("/");
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-7xl mx-auto space-y-8">
            {children}
           </div>
        </div>
      </main>
    </div>
  );
}
