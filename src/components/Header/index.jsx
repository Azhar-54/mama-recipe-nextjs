'use client'

import { Text } from "./..";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation';

export default function Header({ ...props }) {
  const pathname = usePathname();

  return (
    <header
      {...props}
      className={`${props.className} flex self-start justify-between items-center w-[22%] md:w-full ml-[110px] gap-5 md:p-5 md:ml-0 flex-wrap`}
    >
      <Link href="/landingpage">
        <Text as="p" className={pathname === '/landingpage' ? "underline" : ""}>
          Home
        </Text>
      </Link>
      <Link href="/addrecipe">
        <Text as="p" className={pathname === '/addrecipe' ? "underline" : ""}>
          Add Recipe
        </Text>
      </Link>
      {/* <Link href="/detailresep">
        <Text as="p" className={pathname === '/detailresep' ? "underline" : ""}>
          Detail Recipe
        </Text>
      </Link> */}
      <Link href="/profile">
        <Text as="p" className={pathname === '/profile' ? "underline" : ""}>
          Profile
        </Text>
      </Link>
    </header>
  );
}
