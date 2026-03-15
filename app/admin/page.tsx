import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Preview | GOODDEMON",
  description: "Visible admin dashboard for GOODDEMON testing."
};

export default function AdminPage() {
  return <AdminDashboard />;
}
