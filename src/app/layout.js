 
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";  
import dynamic from 'next/dynamic'; 
const Layout = dynamic(()=> import('@/components/layout/layout'), { ssr: false });
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ZanVisionLabs Admin Landing Page",
  description:
    "Get the latest updates on ZanVisionLabs' products and services.",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/v.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout>{children}</Layout>
       
      </body>
    </html>
  );
}
