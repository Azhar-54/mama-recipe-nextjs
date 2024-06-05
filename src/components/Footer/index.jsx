import { Text, Img } from "./..";
import React from "react";

export default function Footer({ ...props }) {
  return (
    <footer
      {...props}
      className={`${props.className} flex self-stretch justify-end items-end p-[55px] md:p-5 bg-amber-400`}
    >
      <div className="mr-[171px] mt-[174px] flex w-[63%] flex-col items-start gap-[214px] md:w-full md:gap-40 sm:gap-[107px]">
        <div className="flex flex-col items-center gap-[30px]">
          <Text size="4xl" as="p" className="capitalize">
            Eat, Cook, Repeat
          </Text>
          <Text size="lg" as="p" className="!font-normal capitalize !text-gray-600">
            Share your best recipe by uploading here !
          </Text>
        </div>
        <div className="flex w-[90%] items-center justify-between gap-5 self-end md:w-full sm:flex-col">
          <Text size="s" as="p" className="!font-poppins capitalize !text-gray-600">
            Product Company Learn more Get in touch{" "}
          </Text>
          <div className="flex items-start gap-[5px] self-end">
            <Img src="img_user.svg" width={15} height={14} alt="user image" className="h-[14px] w-[15px]" />
            <Text size="xs" as="p" className="!font-poppins capitalize !text-black-900">
              Arkademy
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
