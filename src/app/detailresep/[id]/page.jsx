'use client';
import React, { useEffect } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe, toggleLike, saveRecipe } from '../../../redux/slice/feature/recipeSlice';
import { Text, Img, Button, TextArea } from "../../../components";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

export default function DetailResepPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { recipe, loading, error, liked, saved } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipe(id));
    }
  }, [id, dispatch]);

  const handleLike = () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(toggleLike({ id, token, liked })).then(() => {
        alert(liked ? 'Like removed successfully!' : 'Recipe liked successfully!');
      });
    } else {
      alert('Anda harus login terlebih dahulu');
      router.push('/login');
    }
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(saveRecipe({ id, token, saved })).then(() => {
        alert(saved ? 'Recipe unsaved successfully!' : 'Recipe saved successfully!');
      });
    } else {
      alert('Anda harus login terlebih dahulu');
      router.push('/login'); // Navigate to login page
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipe: {error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full bg-white-A700 pt-[66px]">
        <div className="flex flex-col items-center w-full">
          <Header />
          <div className="flex flex-col items-center mt-8 w-[69%] md:w-full md:p-5">
            <div className="flex flex-col items-center w-full">
              <div className="container-xs flex flex-col items-center w-full md:p-5">
                <Text size="4xl" as="p" className="!font-medium capitalize">
                  {recipe.title}
                </Text>
                <div
                  className="mt-[68px] flex h-[700px] w-[83%] items-end justify-end rounded-[15px] bg-cover bg-no-repeat p-10 md
                  md
                  sm
                  "
                  style={{ backgroundImage: `url(${recipe.image || '/images/default-image.png'})` }}
                >
                  <div className="mt-[568px] flex gap-4">
                    <Button size="xs" shape="round" className="w-[52px]" onClick={handleSave}>
                      <Img src="/images/bookmark.svg" width={52} height={52} />
                      {saved ? 'Saved' : 'Save'}
                    </Button>
                    <Button size="xs" shape="round" className="w-[52px]" onClick={handleLike}>
                      <Img src="/images/like.svg" width={52} height={52} />
                      {liked ? 'Liked' : 'Like'}
                    </Button>
                  </div>
                </div>
                <Text size="3xl" as="p" className="mt-28 capitalize !text-gray-800">
                  Ingredients
                </Text>
                <Text
                  size="2xl"
                  as="p"
                  className="mt-[37px] w-[50%] capitalize leading-[46px] !text-black-900 md:w-full text-center"
                >
                  {recipe.description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Text>
              </div>
              <div className="flex flex-col items-center mt-[140px] gap-10 w-full">
                <TextArea
                  shape="round"
                  name="Comment Field"
                  placeholder="Comment :"
                  className="w-full font-medium text-gray-700 sm:p-5"
                />
                <Button shape="round" className="min-w-[426px] font-inter font-medium sm:px-5">
                  Send
                </Button>
              </div>
              <div className="container-xs mt-12 flex flex-col items-center w-full gap-[41px] md:p-5">
                <Text size="3xl" as="p" className="capitalize !text-gray-800">
                  Comment
                </Text>
                <div className="flex w-[47%] gap-[38px] md:w-full sm:flex-col">
                  <Img
                    src="/images/img_ellipse_128.png"
                    width={64}
                    height={64}
                    alt="user avatar"
                    className="h-[64px] w-[64px] rounded-[32px] object-cover sm:w-full"
                  />
                  <div className="flex flex-1 flex-col items-start sm:self-stretch">
                    <Text size="lg" as="p" className="capitalize !text-black-900">
                      Ayudia
                    </Text>
                    <Text size="lg" as="p" className="!font-normal capitalize !text-black-900">
                      Nice recipe. simple and delicious, thankyou
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer className="mt-[247px]" />
        </div>
      </div>
    </>
  );
}
