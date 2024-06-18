'use client';

import { Text, Button, Input, TextArea } from "../../../components";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation'; // Assuming you're using Next.js

export default function UpdateRecipePage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    });
    console.log("masuk update")
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Anda harus login');
            router.push('/login');
        }

        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://pijar-mama-recipe.vercel.app/v1/recipes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const { title, description, image } = response.data.data;
                setFormData({ title, description, image });
                setImagePreview(image);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [id, router]);

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

        let imageUrl = formData.image;
        if (imageFile) {
            imageUrl = await uploadImageToCloudinary();
            if (!imageUrl) {
                // Handle error (e.g., show an error message)
                return;
            }
        }

        const data = {
            title: formData.title,
            description: formData.description,
            image: imageUrl
        };

        try {
            const response = await axios.put(`https://pijar-mama-recipe.vercel.app/v1/recipes/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Recipe updated successfully:", response.data);
            alert("Resep berhasil diperbarui");
            router.push('/profile'); // Redirect to profile page
        } catch (error) {
            console.error("Error updating recipe:", error);
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
                                    {uploading ? 'Updating...' : 'Update'}
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
