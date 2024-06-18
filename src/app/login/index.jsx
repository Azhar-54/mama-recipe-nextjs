'use client';

import { Text, Img, Button, CheckBox, Input, Heading } from "../../components";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/authSlice';
import Cookies from 'js-cookie'; // Import js-cookie

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      const { token } = result.payload;
      localStorage.setItem("token", token);
      Cookies.set("token", token); 
      alert("Login successful");
      router.push("/landingpage");
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
        <Heading size="xs" as="h1" className=" !text-white-A700 mt-4 text-4xl">
          Mama Recipe.
        </Heading>
      </div>
      <div className="right-section flex w-1/2 flex-col items-center justify-center p-10 bg-white">
        <Heading as="h2" className="text-3xl">Welcome</Heading>
        <Text as="p" className="mt-2 text-blue_gray-400">
          Log in into your existing account
        </Text>
        {error && (
          <Text as="p" className="text-red-500 mt-2">
            {error}
          </Text>
        )}
        <form className="flex flex-col w-full mt-4" onSubmit={handleLogin}>
          <label className="text-lg font-medium text-gray-600">E-mail</label>
          <Input
            shape="round"
            type="email"
            name="email"
            placeholder="examplexxx@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400"
          />
          <label className="text-lg font-medium text-gray-600 mt-4">Password</label>
          <Input
            shape="round"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400"
          />
          <div className="flex items-center mt-4">
            <CheckBox
              name="TermsCheckbox"
              label="I agree to terms & conditions"
              id="TermsCheckbox"
              className="mr-2"
            />
          </div>
          <Button type="submit" className="mt-6 w-full p-2 bg-amber-400 text-white rounded hover:bg-amber-500">
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
        <Text as="p" className="text-gray-500 mt-4">
          Forgot Password?
        </Text>
        <Text as="p" className="text-gray-500 mt-4 flex items-center">
          Don’t have an account?
          <Link href="/register" className="text-amber-400 ml-1">Sign Up</Link>
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
