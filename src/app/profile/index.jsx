'use client';

import { Text } from "../../components/Text";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Image from 'next/image';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';
import '../../styles/font.css'; 
import useWindowWidth from './useWindowWidth'; 

const ProfilePage = ({ initialTab = 'myRecipe', initialRecipes = [], userName, error }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const windowWidth = useWindowWidth(); 
  const router = useRouter();

  const apiUrls = {
    myRecipe: 'https://pijar-mama-recipe.vercel.app/v1/recipes/self',
    savedRecipe: 'https://pijar-mama-recipe.vercel.app/v1/recipes/save',
    likedRecipe: 'https://pijar-mama-recipe.vercel.app/v1/recipes/like',
    userProfile: 'https://pijar-mama-recipe.vercel.app/v1/users/profile',
  };

  const tabs = [
    { key: 'myRecipe', label: 'My Recipe' },
    { key: 'savedRecipe', label: 'Saved Recipe' },
    { key: 'likedRecipe', label: 'Liked Recipe' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda harus login terlebih dahulu');
      router.push('/login');
    }
  }, [router]);

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

      if (tab === 'likedRecipe' || tab === 'savedRecipe') {
        const modifiedRecipes = response.data.data.map(item => item.recipe);
        setRecipes(modifiedRecipes);
      } else {
        setRecipes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const deleteUrl = activeTab === 'savedRecipe'
        ? `https://pijar-mama-recipe.vercel.app/v1/recipes/save/${id}`
        : `https://pijar-mama-recipe.vercel.app/v1/recipes/${id}`;

      await axios.delete(deleteUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
      console.log("Recipe deleted successfully");
      alert("delete recipe success")
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleUpdate = (id) => {
    router.push(`/update-recipe/${id}`);
  };

  const handleRecipeClick = (id) => {
    router.push(`/detailresep/${id}`);
  };

  const handleLeftClick = () => {
    setCurrentTabIndex((prevIndex) => (prevIndex === 0 ? tabs.length - 1 : prevIndex - 1));
  };

  const handleRightClick = () => {
    setCurrentTabIndex((prevIndex) => (prevIndex === tabs.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="font-airbnb flex w-full flex-col items-center gap-10 bg-white-A700 pt-[66px] md:pt-5">
        <div className="flex flex-col gap-10 self-stretch">
          <div className="flex flex-col items-center self-stretch">
            <Header />
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <div className="flex flex-col items-center">
                <div className="container-xs px-5">
                  <div className="flex flex-col items-center gap-10">
                    <div className="self-stretch">
                      <div className="flex flex-col items-end">
                        <Image
                          src="/images/img_ellipse_127.png"
                          width={172}
                          height={172}
                          alt="profile image"
                          className="h-[172px] w-full rounded-[86px] object-cover md:h-auto"
                        />
                        <Image
                          src="/images/edit_icon.svg"
                          width={24}
                          height={24}
                          alt="edit icon"
                          className="relative mt-[-24px] h-[24px] w-[24px] color-red-500"
                        />
                      </div>
                    </div>
                    <Text size="lg" as="p" className="!text-black-900" style={{ fontSize: '30px' }}>
                      {userName}
                    </Text>
                  </div>
                </div>

                {error && (
                  <div className="mt-[20px] flex flex-col items-center">
                    <Text size="lg" as="p" className="!text-red-500" style={{ fontSize: '20px' }}>
                      Error fetching data: {error}
                    </Text>
                  </div>
                )}

                <div className="mt-[101px] flex flex-col items-start gap-7 self-stretch">
                  {windowWidth <= 720 ? (
                    <div className="flex items-center justify-center gap-5 md:w-full md:p-5 px-8">
                      <button onClick={handleLeftClick} className="p-2">
                        <Image
                          src="/images/left.svg"
                          width={24}
                          height={24}
                          alt="left icon"
                        />
                      </button>
                      <div className="flex flex-wrap justify-center gap-5 md:w-full md:p-5 px-8 overflow-x-auto whitespace-nowrap">
                        {tabs.map((tab, index) => (
                          <Text
                            key={tab.key}
                            size="lg"
                            as="p"
                            className={`cursor-pointer px-4 ${activeTab === tab.key ? '!text-black-900 border-b-2 border-black-900' : '!text-gray-700'}`}
                            style={{ fontSize: '30px', display: index === currentTabIndex ? 'block' : 'none' }}
                            onClick={() => handleTabClick(tab.key)}
                          >
                            {tab.label}
                          </Text>
                        ))}
                      </div>
                      <button onClick={handleRightClick} className="p-2">
                        <Image
                          src="/images/right.svg"
                          width={24}
                          height={24}
                          alt="right icon"
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap justify-start gap-5 md:w-full md:p-5 px-8 overflow-x-auto whitespace-nowrap">
                      {tabs.map((tab) => (
                        <Text
                          key={tab.key}
                          size="lg"
                          as="p"
                          className={`cursor-pointer px-4 ${activeTab === tab.key ? '!text-black-900 border-b-2 border-black-900' : '!text-gray-700'}`}
                          style={{ fontSize: '30px' }}
                          onClick={() => handleTabClick(tab.key)}
                        >
                          {tab.label}
                        </Text>
                      ))}
                    </div>
                  )}
                  <div className="h-px w-full self-stretch bg-gray-300" />
                </div>

                <div className="mt-10 flex flex-wrap gap-10 justify-center w-full">
                  {recipes.length > 0 ? (
                    recipes.map((item, index) => (
                      <div key={index} className="relative h-[300px] w-[300px] flex-shrink-0 cursor-pointer" onClick={() => handleRecipeClick(item.id)}>
                        <Image
                          src={item.image || '/images/default-image.png'}
                          width={300}
                          height={300}
                          alt="recipe image"
                          className="h-[300px] w-[300px] rounded-[10px] object-cover"
                        />
                        <Text
                          size="xl"
                          as="p"
                          className="absolute bottom-[24.00px] left-[24.00px] m-auto capitalize leading-9 !text-white"
                          style={{ fontSize: '20px' }}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <div className="absolute top-[24px] right-[24px] flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                            className="bg-red-500 text-white p-2 rounded"
                            style={{ fontSize: '16px' }}
                          >
                            Delete
                          </button>
                          {activeTab === 'myRecipe' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdate(item.id);
                              }}
                              className="bg-blue-500 text-white p-2 rounded"
                              style={{ fontSize: '16px' }}
                            >
                              Update
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <Text size="xl" as="p" className="!text-black-900" style={{ fontSize: '30px' }}>
                      No recipes found.
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-center bg-amber-400 py-[37px] sm:py-5 mt-10">
        <div className="container-xs flex justify-center px-[438px] md:p-5 md:px-5">
          <Text size="s" as="p" className="!font-poppins capitalize !text-gray-600">
            Product Company Learn more Get in touch{" "}
          </Text>
        </div>
      </footer>
    </>
  );
};

export default ProfilePage;
