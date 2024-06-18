'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularRecipes, setCurrentPage } from '../redux/slice/recipesSlice';
import { CloseSVG } from "../assets/images";
import { Text, Img, Button, Input, Heading } from "../components";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LandingPagePage() {
  const dispatch = useDispatch();
  const { popularRecipes, loading, error, currentPage } = useSelector((state) => state.recipes);
  const [searchBarValue2, setSearchBarValue2] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("masuk use effect")
    dispatch(fetchPopularRecipes(currentPage));

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [currentPage, dispatch]);

  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    deleteCookie('token'); // Hapus token dari cookie
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    dispatch(setCurrentPage(Math.max(currentPage - 1, 1)));
  };

  if (loading && popularRecipes.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipes: {error}</div>;
  }

  const filteredRecipes = popularRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchBarValue2.toLowerCase())
  );

  return (
    <div className="w-full bg-white-A700">
      <div>
        <div className="relative z-[1] h-[1210px] bg-[url(/images/img_group_22.svg)] bg-cover bg-no-repeat pb-[164px] pl-[108px] pr-[115px] md:h-auto md:px-5 md:pb-5">
          <div className="absolute bottom-[41%] left-[7%] m-auto flex w-[45%] flex-col items-start gap-10">
            <Heading size="md" as="h1" className="w-full capitalize leading-[90px] !text-indigo-900">
              <>
                Discover Recipe <br />& Delicious Food
              </>
            </Heading>
            <Input
              size="sm"
              shape="square"
              name="Search Field"
              placeholder={`search recipe`}
              value={searchBarValue2}
              onChange={(e) => setSearchBarValue2(e.target.value)}
              prefix={
                <Img
                  src="images/img_rewind.svg"
                  width={18}
                  height={18}
                  alt="rewind"
                  className="h-[18px] w-[18px] cursor-pointer"
                />
              }
              suffix={
                searchBarValue2?.length > 0 ? (
                  <CloseSVG onClick={() => setSearchBarValue2("")} height={18} width={18} fillColor="#c4c4c4ff" />
                ) : null
              }
              className="w-[89%] gap-[15px] capitalize !text-indigo-900_99 sm:px-5"
            />
          </div>
          <div className="absolute left-0 right-0 top-[4%] m-auto flex w-full max-w-[1666px] items-center justify-between gap-5 sm:relative sm:flex-col">
            <Header />
            <div className="flex w-auto items-center justify-center gap-2.5 sm:w-full">
              <Link href={"/profile"} className="flex items-center justify-center w-9 h-10">
                <Image src="/images/img_s.svg" width={50} height={50} alt="settings icon" className="w-9 h-10 sm:w-6 sm:h-8" />
              </Link>
              {isLoggedIn ? (
                <Button onClick={handleLogout} size="lg" as="p" className="!text-sky-800">
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Text size="lg" as="p" className="!text-sky-800">
                    Login
                  </Text>
                </Link>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 mb-10 mr-10 w-[52%] md:w-full">
            <Img
              src="/images/img_pngtree_delicious.png"
              width={400}
              height={400}
              alt="delicious image"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
        <div className="relative mt-[-169px] flex flex-col justify-center bg-yellow-50 pb-[200px] pt-[201px] md:py-5">
          {searchBarValue2 ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <Link href={`/detailresep/${recipe.id}`} key={recipe.id} className="relative h-[300px] w-[30%] sm:w-[48%] xs:w-full">
                    <Image
                      src={recipe.image}
                      width={300}
                      height={300}
                      alt={recipe.title}
                      className="h-full w-full rounded-[15px] object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/img_ellipse_128.png';
                      }}
                    />
                    <Text
                      size="3xl"
                      as="p"
                      className="absolute bottom-[8%] left-[8%] m-auto w-[22%] capitalize leading-[41px]"
                    >
                      {recipe.title}
                    </Text>
                  </Link>
                ))
              ) : (
                <Text size="2xl" as="p" className="text-center">
                  Resep makanan yang anda cari tidak di temukan 
                </Text>
              )}
            </div>
          ) : (
            <>
              <div className="mt-64 flex w-[93%] md:w-full md:p-5">
                <div className="flex w-full flex-col gap-[95px] md:gap-[71px] sm:gap-[47px]">
                  <div className="ml-[135px] flex w-[20%] items-center gap-[30px] md:ml-0 md:w-full sm:flex-col">
                    <div className="h-[140px] w-[25px] bg-amber-400" />
                    <Text size="5xl" as="p" className="capitalize">
                      New Recipe
                    </Text>
                  </div>
                  <div className="flex items-center justify-between gap-5 md:flex-col">
                    <div className="relative h-[881px] w-[52%] md:w-full">
                      <div className="absolute left-[0.00px] top-[0.00px] m-auto h-[820px] w-[55%] bg-amber-400" />
                      <Img
                        src="/images/img_rectangle_313.png"
                        width={400}
                        height={400}
                        alt="feature image"
                        className="absolute bottom-[0.00px] right-[0.00px] m-auto h-[800px] w-[800px] rounded-[15px] object-cover"
                      />
                    </div>
                    <div className="flex w-[32%] flex-col items-start md:w-full">
                      <Text size="6xl" as="p" className="w-full leading-[88px]">
                        Healthy Bone Broth Ramen (Quick & Easy)
                      </Text>
                      <div className="mt-6 h-[2px] w-[18%] bg-gray-700" />
                      <Text size="2xl" as="p" className="mt-[35px] w-full leading-8 tracking-[0.96px]">
                        Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!
                      </Text>
                      <Button shape="round" className="mt-[50px] min-w-[200px] !rounded-lg tracking-[1.12px] sm:px-5">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-[100px] flex w-full max-w-[1382px] flex-col gap-[100px] md:px-5">
                <div className="flex w-full flex-col gap-[100px]">
                  <div className="ml-[135px] flex w-[20%] items-center gap-[30px] md:ml-0 md:w-full sm:flex-col">
                    <div className="h-[140px] w-[25px] bg-amber-400" />
                    <Text size="5xl" as="p" className="capitalize">
                      Popular Recipe
                    </Text>
                  </div>
                  <div className="flex flex-wrap gap-[70px] items-center justify-center">
                    {popularRecipes.map((recipe) => (
                      <Link href={`/detailresep/${recipe.id}`} key={recipe.id} className="relative h-[400px] w-[23%] sm:w-[48%] xs:w-full">
                        <Image
                          src={recipe.image}
                          width={300}
                          height={300}
                          alt={recipe.title}
                          className="h-full w-full rounded-[15px] object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/img_ellipse_128.png';
                          }}
                        />
                        <Text
                          size="3xl"
                          as="p"
                          className="absolute bottom-[8%] left-[8%] m-auto w-[22%] capitalize leading-[41px]"
                        >
                          {recipe.title}
                        </Text>
                      </Link>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button onClick={handlePreviousPage} className="mt-8 px-4 py-2 bg-amber-400 text-white rounded-lg">
                      Previous
                    </Button>
                    <Text className="mt-8 px-4 py-2 text-center text-black bg-amber-400">{currentPage}</Text>
                    <Button onClick={handleNextPage} className="mt-8 px-4 py-2 bg-amber-400 text-white rounded-lg">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer className="mt-1" />
      </div>
    </div>
  );
}
