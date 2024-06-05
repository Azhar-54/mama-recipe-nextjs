'use client'

import { Text, Img } from "../../components";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';

const ProfilePage = ({ initialTab = 'myRecipe' }) => {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userName, setUserName] = useState('User');

  const apiUrls = {
    myRecipe: 'https://pijar-mama-recipe.vercel.app/v1/recipes/self',
    savedRecipe: 'https://pijar-mama-recipe.vercel.app/v1/recipes/save',
    likedRecipe: 'https://pijar-mama-recipe.vercel.app/v1/recipes/like',
  };

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(apiUrls[tab], {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Fetched recipes:", response.data);
      setRecipes(response.data.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [recipeResponse, userResponse] = await Promise.all([
          axios.get(apiUrls[initialTab], {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
          axios.get('https://pijar-mama-recipe.vercel.app/v1/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
        ]);

        console.log("Fetched initial recipes:", recipeResponse.data);
        console.log("Fetched user profile:", userResponse.data);

        setRecipes(recipeResponse.data.data || []);
        setUserName(userResponse.data.data.name || 'User');
      } catch (error) {
        console.error("Error fetching data:", error);
        setRecipes([]);
      }
    };

    fetchInitialData();
  }, [initialTab]);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-[4190px] bg-white-A700 pt-[66px] md:gap-[3142px] md:pt-5 sm:gap-[2095px]">
        <div className="flex flex-col gap-[151px] self-stretch md:gap-[113px] sm:gap-[75px]">
          <div className="ml-[110px] flex w-[22%] md:ml-0 md:w-full md:p-5">
            <div className="flex w-full flex-wrap justify-between gap-5">
              <Link href="/landingpage" passHref>
                <Text as="p" className="cursor-pointer">Home</Text>
              </Link>
              <Link href="/addrecipe" passHref>
                <Text as="p" className="cursor-pointer">Add Recipe</Text>
              </Link>
              <Link href="/profile" passHref>
                <Text as="p" className="underline cursor-pointer">Profile</Text>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[61px] sm:gap-[30px]">
            <div>
              <div className="flex flex-col items-center">
                <div className="container-xs px-[559px] md:p-5 md:px-5">
                  <div className="flex flex-col items-center gap-[39px]">
                    <div className="self-stretch">
                      <div className="flex flex-col items-end">
                        <Img
                          src="/images/img_ellipse_127.png"
                          width={172}
                          height={172}
                          alt="profile image"
                          className="h-[172px] w-full rounded-[86px] object-cover md:h-auto"
                        />
                        <Img
                          src="/images/edit_icon.svg"
                          width={24}
                          height={24}
                          alt="edit icon"
                          className="relative mt-[-24px] h-[24px] w-[24px] color-red-500"
                        />
                      </div>
                    </div>
                    <Text size="lg" as="p" className="!text-black-900">
                      {userName}
                    </Text>
                  </div>
                </div>

                <div className="mt-[101px] flex flex-col items-start gap-7 self-stretch">
                  <div className="ml-[143px] flex w-[34%] flex-wrap justify-between gap-5 md:ml-0 md:w-full md:p-5">
                    <Text size="lg" as="p" className={`cursor-pointer ${activeTab === 'myRecipe' ? '!text-black-900' : '!text-gray-700'}`} onClick={() => handleTabClick('myRecipe')}>
                      My Recipe
                    </Text>
                    <Text size="lg" as="p" className={`cursor-pointer ${activeTab === 'savedRecipe' ? '!text-black-900' : '!text-gray-700'}`} onClick={() => handleTabClick('savedRecipe')}>
                      Saved Recipe
                    </Text>
                    <Text size="lg" as="p" className={`cursor-pointer ${activeTab === 'likedRecipe' ? '!text-black-900' : '!text-gray-700'}`} onClick={() => handleTabClick('likedRecipe')}>
                      Liked Recipe
                    </Text>
                  </div>
                  <div className="h-px w-full self-stretch bg-gray-300" />
                </div>

                <div className="mt-[49px] flex w-[40%] gap-[30px] self-start md:w-full md:flex-col md:p-5">
                  {recipes.length > 0 ? (
                    recipes.map((item,index) => (
                      <div key={index} className="relative h-[250px] w-full md:h-auto">
                        <Img
                          src={item.image || '/../../assets/images/'}
                          width={370}
                          height={250}
                          alt="recipe image"
                          className="h-[250px] w-full rounded-[10px] object-cover"
                        />
                        <Text
                          size="xl"
                          as="p"
                          className="absolute bottom-[24.00px] left-[24.00px] m-auto w-[29%] capitalize leading-9 !text-white-A700"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      </div>
                    ))
                  ) : (
                    <Text size="xl" as="p" className="!text-black-900">
                      No recipes found.
                    </Text>
                  )}
                </div>
              </div>
            </div>
            <footer className="flex items-center justify-center bg-amber-400 py-[37px] sm:py-5">
              <div className="container-xs flex justify-center px-[438px] md:p-5 md:px-5">
                <Text size="s" as="p" className="!font-poppins capitalize !text-gray-600">
                  Product Company Learn more Get in touch{" "}
                </Text>
              </div>
            </footer>
          </div>
        </div>

        <div className="container-xs px-[68px] md:p-5 md:px-5">
          <Text size="3xl" as="p" className="leading-[78px] !text-white-A700">
            Have a new ramen recipe? Let’s share!
          </Text>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
