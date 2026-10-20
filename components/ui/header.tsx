'use client';
import Link from "next/link";
import Image from "next/image";
import {ThemeToggle} from "./theme-toggle";
import { SignInButton } from "../auth/sign-in-button";
import { Button } from "./button";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const navItems=[
        { href:"/features", label:"Features"},
        { href:"/about",label:"About Mendly"},
    ];

    const [isMenuOpen,setIsMenuOpen] = useState (false);

    return <div className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur 2xl:px-10 px-4 border-b border-gray-300">
    <header className="relative max-w-6xl">
        <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                <Image src="/mendlyLogoo.png" alt="logo" width={38} height={38} />
                <span className="text-lg font-bold text-[#C46E6F]">Mendly</span>
            </Link>

        {/* navitems */}
        <nav className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => {
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-4 py-2 text-sm font-medium text-[#C46E6F] hover:text-[#9E4B4C] transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                        </Link>
                    );
                })}
            </nav>
            <div className="flex items-center gap-3">
                <ThemeToggle />
                <SignInButton />
                <Button
                    variant="ghost"
                    size="lg"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    >
                    {isMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </Button>

            </div>
        </div>
        {isMenuOpen && (
  <div className="md:hidden absolute left-0 right-0 top-16 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
    <nav className="flex flex-col space-y-1 py-4 px-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className="px-4 py-3 text-sm font-medium text-[#C46E6F] hover:text-[#9E4B4C] transition-colors rounded-md"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  </div>
)}
    </header>
    </div>
}
