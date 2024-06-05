"use client";

import { Text, Img, Button, CheckBox, Input, Heading } from "../../components";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      const response = await axios.post("https://pijar-mama-recipe.vercel.app/v1/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);
      setSuccess("Registration successful. Please check your email for verification.");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        setError(`Registration failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
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
                  Let’s Get Started!
                </Heading>
              </div>
            </div>
            <div className="flex w-[26%] flex-col items-center gap-[30px] md:w-full">
              <div className="flex flex-col items-center gap-[34px]">
                <Heading as="h2">Welcome</Heading>
                <Text as="p" className="!font-inter !font-normal !text-blue_gray-400">
                  Create new account to access all features
                </Text>
              </div>
              <form className="flex flex-col items-start self-stretch" onSubmit={handleSubmit}>
              <div className="flex flex-col items-start self-stretch">
                  <div className="h-px self-stretch bg-gray-100" />
                  <Text size="lg" as="p" className="mt-[5px] !font-inter !font-medium !text-gray-600">
                    Name
                  </Text>
                  <Input
                    shape="round"
                    type="name"
                    name="name"
                    placeholder="Masukan Nama"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="self-stretch border border-solid border-blue_gray-400 font-inter font-medium !text-blue_gray-400"
                  />
                </div>

                <div className="flex flex-col items-start self-stretch">
                  <div className="h-px self-stretch bg-gray-100" />
                  <Text size="lg" as="p" className="mt-[5px] !font-inter !font-medium !text-gray-600">
                    E-mail
                  </Text>
                  <Input
                    shape="round"
                    type="email"
                    name="email"
                    placeholder="Masukan Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="self-stretch border border-solid border-blue_gray-400 font-inter font-medium !text-blue_gray-400"
                  />
                </div>

                <div className="mt-[23px] flex flex-col items-start gap-[13px] self-stretch">
                  <Text size="lg" as="p" className="!font-inter !font-medium !text-gray-600">
                    Phone Number
                  </Text>
                  <Input
                    shape="round"
                    type="text"
                    name="phone"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="self-stretch border border-solid border-blue_gray-400 font-inter font-medium !text-blue_gray-400"
                  />
                </div>

                <div className="mt-[23px] flex flex-col items-start gap-[13px] self-stretch">
                  <Text size="lg" as="p" className="!font-inter !font-medium !text-gray-600">
                    Create New Password
                  </Text>
                  <Input
                    shape="round"
                    type="password"
                    name="password"
                    placeholder="Create New Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="self-stretch border border-solid border-blue_gray-400 font-inter font-medium !text-blue_gray-400"
                  />
                </div>

                <div className="mt-[23px] flex flex-col items-start gap-[13px] self-stretch">
                  <Text size="lg" as="p" className="!font-inter !font-medium !text-gray-600">
                    Confirm Password
                  </Text>
                  <Input
                    shape="round"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="self-stretch border border-solid border-blue_gray-400 font-inter font-medium !text-blue_gray-400"
                  />
                </div>

                <div className="mt-6">
                  <label className="flex items-center gap-2 text-base font-medium text-gray-600">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="form-checkbox"
                    />
                    I agree to terms & conditions
                  </label>
                </div>

                {error && <Text size="xs" as="p" className="mt-2 self-start !text-red-500">{error}</Text>}
                {success && <Text size="xs" as="p" className="mt-2 self-start !text-green-500">{success}</Text>}

                <Button shape="round" className="mt-[37px] w-full font-inter" type="submit">
                  Register
                </Button>
                <Text size="xs" as="p" className="mt-4 self-end !text-gray-500">
                  Forgot Password?
                </Text>
                <div className="h-px w-[40%] self-end bg-gray-100" />
                <div className="relative mt-[-1px] h-px w-[40%] bg-gray-100" />
                <Text size="s" as="p" className="mt-[23px] self-center !text-black-900">
                  <span className="text-gray-500">Already have account? &nbsp;</span>
                  <Link className="text-amber-400" href={"/login"}>
                    Log in Here
                  </Link>
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
  );
}
