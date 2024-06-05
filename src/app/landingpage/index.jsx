"use client";
import { CloseSVG } from "../../assets/images";
import { Text, Img, Button, Input, Heading } from "../../components";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Image from "next/image";

export default function LandingPagePage() {
  const [searchBarValue2, setSearchBarValue2] = useState("");
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  useEffect(() => {
    async function fetchPopularRecipes() {
      try {
        const response = await axios.get("https://pijar-mama-recipe.vercel.app/v1/recipes");
        console.log('API response:', response);  // Log the full response
        console.log('Response data:', response.data); // Log the response data
        setPopularRecipes(response.data.data);  // Adjust this line to correctly set the data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchPopularRecipes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipes: {error.message}</div>;
  }

  if (!Array.isArray(popularRecipes) || popularRecipes.length === 0) {
    return <div>No recipes found</div>;
  }

  const filteredRecipes = popularRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchBarValue2.toLowerCase())
  );

  return (
    <>
      {/* main layout section */}
      <div className="w-full bg-white-A700">
        {/* content section */}
        <div>
          {/* hero section */}
          <div className="relative z-[1] h-[1210px] bg-[url(/images/img_group_22.svg)] bg-cover bg-no-repeat pb-[164px] pl-[108px] pr-[115px] md:h-auto md:px-5 md:pb-5">
            {/* Removed the static image reference for demonstration purposes */}

            {/* intro search section */}
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
                    src="/images/img_rewind.svg"
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

            {/* navigation section */}
            <div className="absolute left-0 right-0 top-[4%] m-auto flex w-full max-w-[1666px] items-center justify-between gap-5 sm:relative sm:flex-col">
       
                <Header />
             
              <div className="flex w-[6%] items-center justify-center gap-2.5 sm:w-full">
                <Link href={"/profile"} className="h-[52px] w-[52px]" >
                <Img src="/images/img_s.svg" width={52} height={52} alt="settings icon" className="h-[52px] w-[52px]" />
                </Link>

                {isLoggedIn ? (
                  <Text size="lg" as="p" className="!text-white-A700 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </Text>
                ) : (
                  <Link href="/login">
                    <Text size="lg" as="p" className="!text-white-A700">
                      Login
                    </Text>
                  </Link>
                  )}
              </div>
            </div>

            {/* featured image section */}
            <div className="absolute bottom-0 right-0 mb-10 mr-10 w-[52%] md:w-full">
              <Img
                src="/images/img_pngtree_delicious.png"
                width={878}
                height={870}
                alt="delicious image"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className="relative mt-[-169px] flex flex-col justify-center bg-yellow-50 pb-[611px] pt-[201px] md:py-5">
            
            {searchBarValue2 ? (
              <div className="flex flex-wrap gap-3 justify-center">
                {filteredRecipes.map((recipe) => (
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
                ))}
              </div>
            ) : (
              <>
                {/* new recipes section */}
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
                          width={800}
                          height={800}
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

                {/* footer section */}
                <div className="mx-auto mt-[229px] flex w-full max-w-[1651px] self-center md:p-5">
                  <div className="flex flex-col w-full gap-14">
                    <div className="flex w-full items-center gap-[30px] md:w-full sm:flex-col">
                      <div className="h-[140px] w-[25px] bg-amber-400" />
                      <Text size="5xl" as="p" className="capitalize">
                        Popular Recipe
                      </Text>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {popularRecipes.map((recipe) => (
                        <Link href={`/detailresep/${recipe.id}`} key={recipe.id} className="relative h-[300px] w-[30%] sm:w-[48%] xs:w-full">
                          <img
                            src={recipe.image}
                            width={300}
                            height={300}
                            alt={recipe.title}
                            className="h-full w-full rounded-[15px] object-cover"
                            onError={(e) => {
                              e.target.onerror = null; // prevents infinite loop
                              e.target.src = '/images/default-image.png'; // fallback image
                            }}
                          />
                          <Text
                            size="3xl"
                            as="p"
                            className="absolute bottom-[8%] left-[8%] m-auto w-[22%] capitalize leading-[41px] text-white"
                          >
                            {recipe.title}
                          </Text>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative mt-[140px] h-[685px] md:h-auto">
                  <div className="flex w-full flex-col items-end justify-center gap-[214px] bg-amber-400 pb-[59px] pl-14 pr-[667px] pt-[230px] md:gap-40 md:p-5 sm:gap-[107px]">
                    <div className="flex flex-col items-center gap-[30px]">
                      <Text size="7xl" as="p" className="capitalize !text-indigo-900">
                        Eat, Cook, Repeat
                      </Text>
                      <Text size="2xl" as="p" className="!font-normal capitalize !text-gray-600_01">
                        Share your best recipe by uploading here !
                      </Text>
                    </div>
                    <Text size="lg" as="p" className="mr-16 !font-poppins capitalize !text-gray-600_01 md:mr-0">
                      Product Company Learn more Get in touch{" "}
                    </Text>
                  </div>
                  <Text
                    size="md"
                    as="p"
                    className="absolute bottom-[8%] right-[12%] m-auto !font-poppins capitalize !text-black-900"
                  >
                    Arkademy
                  </Text>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
