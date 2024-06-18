'use client'
import { Text, Img } from "./..";
import React from "react";

export default function Footer({ ...props }) {
  return (
    <footer
      {...props}
      className={`w-full ${props.className} flex justify-center items-center p-[55px] md:p-5 bg-amber-400 mt-10`}
    >
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center gap-[30px]">
          <Text size="4xl" as="p" className="capitalize">
            Eat, Cook, Repeat
          </Text>
          <Text size="lg" as="p" className="!font-normal capitalize !text-gray-600">
            Share your best recipe by uploading here!
          </Text>
        </div>
        <div className="flex w-full items-center justify-between mt-[50px]">
          <Text size="s" as="p" className="!font-poppins capitalize !text-gray-600 text-center w-full">
            Product Company Learn more Get in touch
          </Text>
          <div className="flex items-center gap-[5px]">
            <Img src="images/img_user.svg" width={15} height={14} alt="user image" className="h-[14px] w-[15px]" />
            <Text size="xs" as="p" className="!font-poppins capitalize !text-black-900">
              Arkademy
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
