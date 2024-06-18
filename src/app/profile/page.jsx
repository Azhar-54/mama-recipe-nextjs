//src\app\profile\page.jsx
import React from "react";
import axios from 'axios';
import { cookies } from 'next/headers';
import ProfilePage from ".";

export const metadata = {
  title: "Garneta Sharina's Profile - Arkademy Recipes",
  description:
    "Explore Garneta Sharina's personal recipe collection, including favorites like Bomb Chicken and Banana Pancake. Save and like top recipes.",
};

async function fetchData(token, url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

export default async function Profile() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const initialTab = 'myRecipe';

  // Fetch initial recipes
  const initialRecipes = await fetchData(token, 'https://pijar-mama-recipe.vercel.app/v1/recipes/self');

  // Fetch user profile
  console.log("masuk recipe")
  const userProfile = await fetchData(token, 'https://pijar-mama-recipe.vercel.app/v1/users/profile');
  const userName = userProfile.name;

  return (
    <ProfilePage
      initialTab={initialTab}
      initialRecipes={initialRecipes}
      userName={userName}
      error={null}
    />
  );
}
