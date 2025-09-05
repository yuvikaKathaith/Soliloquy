import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Soliloquy",
  description: "A Journaling App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <div className="bg-[url('/bg.jpg')] dark:bg-[url('/bg_dark.jpg')] dark:bg-cover fixed -z-10 inset-0 opacity-40" />
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="py-10 opacity-90">
            <div className="mx-auto px-4 text-center text-gray-900">
              <p>Made with ♥️ by Yuvika Kathaith</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
