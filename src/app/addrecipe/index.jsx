'use client';

import { Text, Button, Input, TextArea } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Assuming you're using Next.js

export default function AddRecipePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda harus login');
      router.push('/login'); 
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'mama_recipe');

    setUploading(true);
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dutl53kgs/image/upload', data); 
      setUploading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) {
      // Handle error (e.g., show an error message)
      return;
    }

    const data = {
      title: formData.title,
      description: formData.description,
      image: imageUrl
    };

    try {
      const response = await axios.post('https://pijar-mama-recipe.vercel.app/v1/recipes', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          'Content-Type': 'application/json'
        }
      });
      console.log("Recipe posted successfully:", response.data);
      alert("Berhasil menambahkan resep")
      // Add the new recipe to the user's recipes list
      const selfResponse = await axios.get('https://pijar-mama-recipe.vercel.app/v1/recipes/self', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        }
      });
      const updatedRecipes = [...selfResponse.data.data, response.data.data];
      console.log("Updated user recipes list:", updatedRecipes);

      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error posting recipe:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      {/* main layout section */}
      <div className="flex w-full justify-center bg-white-A700 pt-[100px] md:pt-5">
        <div className="mx-auto flex flex-col items-center gap-[2907px] bg-white-A700 pt-[66px] md:gap-[2180px] md:pt-5 sm:gap-[1453px] w-[80%]"> {/* Adjusted width */}
          <div className="flex flex-col items-center self-stretch">
            <Header />
            <div className="mt-[175px] w-full md:p-5"> {/* Adjusted width and removed container-xs */}
              {/* recipe submission form section */}
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex justify-center self-stretch rounded-[15px] bg-gray-100 px-14 py-[182px] md:p-5">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="mt-[82px] rounded-[15px] object-cover w-full h-full" />
                  ) : (
                    <Text size="lg" as="p" className="mt-[82px] !text-blue-500">
                      Add Photo
                    </Text>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-10 w-full"
                />
                <Input
                  shape="round"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-10 w-full"
                />
                <TextArea
                  shape="round"
                  name="description"
                  placeholder="Ingredients"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-10 self-stretch font-medium text-gray-700 sm:p-5"
                />
                <Button type="submit" shape="round" className="mt-[100px] w-full max-w-[426px] font-inter font-medium sm:px-5" disabled={uploading}>
                  {uploading ? 'Posting...' : 'Post'}
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
      <Footer className="mt-[100px] " />
    </>
  );
}
