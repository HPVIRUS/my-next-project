"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const quaryclint = new QueryClient();

export default function ReactQuaryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={quaryclint}>{children}</QueryClientProvider>
  );
}
