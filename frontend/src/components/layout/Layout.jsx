import React from "react";
import { Navigation } from "./Navigation";
import { Header } from "./Header";

export function Layout({ children, currentPath }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPath={currentPath} />
      <main className="pb-16 md:pb-0">{children}</main>
      <Navigation currentPath={currentPath} />
    </div>
  );
}
