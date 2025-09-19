import {
  Inter,
  Space_Mono,
  Caveat,
  Poppins,
  Special_Elite
} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import { neobrutalism } from "@clerk/themes";
import { Toaster } from "sonner";

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],          
  variable: "--font-special-elite",
});

const poppins = Poppins({
  subsets: ['latin'],     // required
  weight: ["300", "400", "500", "600", "700"], 
  style: ['normal', 'italic'],
  variable: '--font-poppins', 
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
});

const inter = Inter({
  variable: "--font-inter-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});


export const metadata = {
  title: "Soliloquy",
  description: "A Journaling App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${poppins.variable} ${spaceMono.variable} ${caveat.variable} ${specialElite.variable} antialiased`}>
          <div className="bg-[url('/bg.jpg')] dark:bg-[url('/bg_dark.jpg')] dark:bg-cover fixed -z-10 inset-0 opacity-40" />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors /> 
          <footer className="py-10 opacity-90">
            <div className="font-space mx-auto px-4 text-center text-gray-900 ">
              <p className="text-[14px]">
                Made with ♥️ by{" "}
                <Link
                  href="https://yuvikakathaith.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block text-orange-500 font-semibold font-inter lg:text-[14px] cursor-pointer group mt-4"
                >
                  Yuvika Kathaith
                  <span className="absolute left-0 bottom-0 h-[1.2px] w-full bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
