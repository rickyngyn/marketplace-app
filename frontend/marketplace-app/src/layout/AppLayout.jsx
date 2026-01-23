import { Outlet } from "react-router-dom";
import AppNav from "../components/ui/AppNav.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNav />
      <main className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
