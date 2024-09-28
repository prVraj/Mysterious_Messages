import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
// import dbConnecte from "@/lib/dbConnect";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ensure the database connection is established before rendering

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
