// pages/login.js
"use client";

import { Text, Img, Button, Input, Heading } from "../../components";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, setError, setSuccess } from '../../redux/slice/formSlice';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formData, error, success } = useSelector((state) => state.form);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateFormData({
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    dispatch(updateFormData({ agreeToTerms: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(''));
    dispatch(setSuccess(''));

    if (formData.password !== formData.confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    if (!formData.agreeToTerms) {
      dispatch(setError("You must agree to the terms and conditions"));
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
      alert("Registration successful. Please check your email for verification.");
      dispatch(setSuccess("Registration successful. Please check your email for verification."));
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(`Registration failed: ${error.response.data.message || 'Unknown error'}`);
        dispatch(setError(`Registration failed: ${error.response.data.message || 'Unknown error'}`));
      } else {
        alert("Registration failed. Please try again.");
        dispatch(setError("Registration failed. Please try again."));
      }
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="left-section flex w-1/2 bg-amber-400 flex-col items-center justify-center p-10">
        <Img
          src="/images/img_barbecue_1.svg"
          width={182}
          height={182}
          alt="barbecue image"
          className="h-44 w-44"
        />
        <Heading size="xs" as="h1" className="!text-white-A700 mt-4 text-4xl">
          Let’s Get Started!
        </Heading>
      </div>
      <div className="right-section flex w-1/2 flex-col items-center justify-center p-10 bg-white">
        <Heading as="h2" className="text-3xl">Welcome</Heading>
        <Text as="p" className="mt-2 text-blue_gray-400">
          Create new account to access all features
        </Text>
        {error && (
          <Text as="p" className="text-red-500 mt-2">
            {error}
          </Text>
        )}
        {success && (
          <Text as="p" className="text-green-500 mt-2">
            {success}
          </Text>
        )}
        <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit}>
          <label className="text-lg font-medium text-gray-600">Name</label>
          <Input
            shape="round"
            type="text"
            name="name"
            placeholder="Masukan Nama"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400"
          />
          <label className="text-lg font-medium text-gray-600 mt-4">E-mail</label>
          <Input
            shape="round"
            type="email"
            name="email"
            placeholder="Masukan Email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400"
          />
          <label className="text-lg font-medium text-gray-600 mt-4">Phone Number</label>
          <Input
            shape="round"
            type="text"
            name="phone"
            placeholder="08xxxxxxxxxx"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400"
          />
          <label className="text-lg font-medium text-gray-600 mt-4">Create New Password</label>
          <Input
            shape="round"
            type="password"
            name="password"
            placeholder="Create New Password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400"
          />
          <label className="text-lg font-medium text-gray-600 mt-4">Confirm Password</label>
          <Input
            shape="round"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400"
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-base font-medium text-gray-600">I agree to terms & conditions</label>
          </div>
          <Button type="submit" className="mt-6 w-full p-2 bg-amber-400 text-white rounded hover:bg-amber-500">
            Register
          </Button>
        </form>
        <Text as="p" className="text-gray-500 mt-4 flex items-center">
          Already have an account?
          <Link href="/login" className="text-amber-400 ml-1">Login Here</Link>
        </Text>
      </div>
      <style jsx>{`
        @media (max-width: 720px) {
          .left-section {
            display: none;
          }
          .right-section {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
