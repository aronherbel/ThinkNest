import { Metadata } from "next";
import "./globals.css";
import Header from "@/app/header/Header";
import Navbar from "@/app/navbar/NavBar";

export const metadata: Metadata = {
  title: "ThinkNest",
  description: "Your Brain's Best Friend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
        />
      </head>
      <body className="h-full">
        <Header />
        <div className="flex h-screen">
          <div className="w-44 h-full text-sm">
            <Navbar />
          </div>
          <main className="flex-1 bg-[#F9F9F9] rounded-tl-[1rem]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
