'use client'
import { Text, Img, Button, CheckBox, Input, Heading } from "../../components";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://pijar-mama-recipe.vercel.app/v1/auth/login", {
        email,
        password,
      });
      const { token } = response.data.data;
      localStorage.setItem("token", token); // Save the token to localStorage
      alert("Login successful");
      router.push("/landingpage"); // Redirect to the landing page
    } catch (err) {
      setError("Failed to log in. Please check your credentials and try again.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex w-full bg-white-A700">
        <div className="flex w-[86%] flex-col items-end gap-[3498px] self-end md:w-full md:gap-[2623px] md:p-5 sm:gap-[1749px]">
          <div className="relative h-[1805px] self-stretch">
            <div className="absolute left-0 right-0 top-[0.00px] m-auto flex w-full items-center justify-between gap-5 md:relative md:flex-col">
              <div className="flex w-[58%] flex-col items-center justify-center bg-amber-400 px-14 pb-[659px] pt-[702px] md:w-full md:p-5">
                <div className="flex w-[21%] flex-col items-center gap-[19px] md:w-full">
                  <Img
                    src="/images/img_barbecue_1.svg"
                    width={182}
                    height={182}
                    alt="barbecue image"
                    className="h-[182px] w-full md:h-auto"
                  />
                  <Heading size="xs" as="h1" className="!text-white-A700">
                    Mama Recipe.
                  </Heading>
                </div>
              </div>
              <div className="flex w-[26%] flex-col items-center gap-[30px] md:w-full">
                <div className="flex flex-col items-center gap-[34px]">
                  <Heading as="h2">Welcome</Heading>
                  <Text as="p" className="!font-inter !font-normal !text-blue_gray-400">
                    Log in into your existing account
                  </Text>
                </div>
                {error && (
                  <Text as="p" className="!font-inter !font-normal !text-red-500">
                    {error}
                  </Text>
                )}
                <form className="flex flex-col items-start self-stretch" onSubmit={handleLogin}>
                  <div className="flex flex-col items-start self-stretch">
                    <div className="h-px self-stretch bg-gray-100" />
                    <Text size="lg" as="p" className="mt-[5px] !font-inter !font-medium !text-gray-600">
                      E-mail
                    </Text>
                    <Input
                      shape="round"
                      type="email"
                      name="email"
                      placeholder="examplexxx@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-[13px] self-stretch border border-solid border-blue_gray-400 font-inter font-medium focus:border-amber-400"
                    />
                  </div>
                  <div className="mt-[23px] flex flex-col items-start gap-[13px] self-stretch">
                    <Text size="lg" as="p" className="!font-inter !font-medium !text-gray-600">
                      Password
                    </Text>
                    <Input
                      shape="round"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="self-stretch border border-solid border-blue_gray-400 font-inter font-medium !text-blue_gray-400"
                    />
                  </div>
                  <CheckBox
                    name="TermsCheckbox"
                    label="I agree to terms & conditions"
                    id="TermsCheckbox"
                    className="mt-6 gap-3.5 p-px font-inter text-base font-medium text-gray-600"
                  />
                  <Button shape="round" type="submit" className="mt-[37px] w-full font-inter">
                    Log in
                  </Button>
                  <Text size="xs" as="p" className="mt-4 self-end !text-gray-500">
                    Forgot Password ?
                  </Text>
                  <div className="h-px w-[40%] self-end bg-gray-100" />
                  <div className="relative mt-[-1px] h-px w-[40%] bg-gray-100" />
                  <Text size="s" as="p" className="mt-[23px] self-center !text-black-900">
                    <span className="text-gray-500">Don’t have an account?&nbsp;</span>
                    <Link className="text-amber-400 ml-1" href={"/register"}>Sign Up</Link>
                  </Text>
                </form>
              </div>
            </div>
          </div>
          <Text size="5xl" as="p" className="mr-[109px] w-[75%] leading-[78px] !text-white-A700 md:mr-0 md:w-full">
            Have a new ramen recipe? Let’s share!
          </Text>
        </div>
      </div>
    </>
  );
}
