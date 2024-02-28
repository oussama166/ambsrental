import { Footer } from "@/Components/Footer";
import { NavBar } from "@/Components/NavBar";
import type { Metadata } from "next";
import "./globals.css";
import "./style.css";

export const metadata: Metadata = {
  title: "AMBS",
  description: "Page d'acceuil de site AMBS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`bg-whiteAmbsi`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
