import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FolderOpenIcon, PenBox } from "lucide-react";
import UserMenu from "./user-menu.jsx";
import { checkUser } from "@/lib/checkUser";       

const Header = async() => {
  await checkUser();
  return (
    <header className="container mx-auto">
      <nav className="md:px-5 lg:px-5 md:py-5 lg:py-5 py-6 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="soliloquy"
            width={100}
            height={100}
            className="md:h-15 lg:h-13 h-12 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          {/* when signedIn show collections */}
          <SignedIn>
            <Link href="/dashboard#collections">
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpenIcon size={18} />
                <span className="font-inter hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>

          <Link href="/journal/write">
            <Button variant="journal" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="font-inter hidden md:inline">Write New</span>
            </Button>
          </Link>

          {/* when signedIn show user icon */}
          <SignedIn>
            <UserMenu />
          </SignedIn>

          {/* when signed out show login button */}
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">
                <span className="font-inter">Login</span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
