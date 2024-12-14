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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
        />
      </head>
      <body className="h-full">
        <div className="fixed w-full top-0 z-10">
          <Header />
        </div>

        <div className="flex h-screen pt-[5rem]"> 
          <div className="fixed h-full w-[12.5rem]">
            <Navbar />
          </div>
          <main className="flex-1 ml-56 bg-[#F9F9F9] rounded-tl-[1rem] overflow-y-scroll px-14 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
