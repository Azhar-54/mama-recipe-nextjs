'use client'

import { Text, Button, Img } from "./.."; // Pastikan path impor benar
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Navbar({ ...props }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    deleteCookie('token');
  };

  return (
    <header
      {...props}
      className={`bg-transparent flex justify-between items-center w-full p-6 md:p-4 shadow-lg ${props.className}`}
    >
      <div className="flex items-center gap-2">
        <Link href="/landingpage">
          <Text as="p" className={`mr-4 text-lg ${pathname === '/landingpage' ? "underline" : ""}`}>
            Home
          </Text>
        </Link>
        <Link href="/addrecipe">
          <Text as="p" className={`mr-4 text-lg ${pathname === '/addrecipe' ? "underline" : ""}`}>
            Add Recipe
          </Text>
        </Link>
        <Link href="/profile">
          <Text as="p" className={`mr-4 text-lg ${pathname === '/profile' ? "underline" : ""}`}>
            Profile
          </Text>
        </Link>
      </div>
      <div className="flex items-center ml-auto gap-2.5">
        <Link href={"/profile"} className="flex items-center justify-center w-9 h-10">
          <Image src="/images/img_s.svg" width={50} height={50} alt="settings icon" className="w-9 h-10 sm:w-6 sm:h-8" />
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} size="lg" as="p" className="!text-sky-800">
            Logout
          </button>
        ) : (
          <Link href="/login">
            <Text size="lg" as="p" className="!text-sky-800">
              Login
            </Text>
          </Link>
        )}
      </div>
    </header>
  );
}
