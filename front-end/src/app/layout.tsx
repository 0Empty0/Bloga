import { Metadata } from "next";
import "./globals.css"

export default function Root({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Bloga",
  description: "Bloga - blogging app"
};
