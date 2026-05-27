import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "East Star",
  description: "Private school in Tashkent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
