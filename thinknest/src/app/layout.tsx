import { Metadata } from 'next';
import './globals.css';  
import Header from '@/components/Header/Header'
import Navbar from '@/components/NavBar/NavBar'

export const metadata: Metadata = {
  title: 'ThinkNest',
  description: "Your Brain's Best Friend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        <Header />   
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}