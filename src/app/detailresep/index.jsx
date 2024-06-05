"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import { Text, Img, Button, TextArea } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function DetailResepPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // assuming the id is passed as a query parameter
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchRecipe() {
        try {
          const response = await axios.get(`https://pijar-mama-recipe.vercel.app/v1/recipes/${id}`);
          setRecipe(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipe:", error);
          setError(error);
          setLoading(false);
        }
      }

      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipe: {error.message}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center gap-[1143px] bg-white-A700 pt-[66px] md:gap-[857px] md:pt-5 sm:gap-[571px]">
        <div className="flex flex-col items-center self-stretch">
          {/* <Header /> */}
          <div className="mt-[151px] w-[69%] md:w-full md:p-5">
            <div className="flex flex-col">
              <div className="container-xs flex flex-col items-start md:p-5">
                <Text size="4xl" as="p" className="mr-[241px] self-end !font-medium capitalize md:mr-0">
                  {recipe.title}
                </Text>
                <div
                  className="mt-[68px] flex h-[700px] w-[83%] items-end justify-end self-end rounded-[15px] bg-cover bg-no-repeat p-10 md:h-auto md:w-full sm:p-5"
                  style={{ backgroundImage: `url(${recipe.image || '/images/default-image.png'})` }}
                >
                  <div className="mt-[568px] flex gap-4">
                    <Button size="xs" shape="square" className="w-[52px]">
                      <Img src="/images/img_warning.svg" width={52} height={52} />
                    </Button>
                    <Button size="xs" shape="square" className="w-[52px]">
                      <Img src="/images/img_group_19.svg" width={52} height={52} />
                    </Button>
                  </div>
                </div>
                <Text size="3xl" as="p" className="mt-28 capitalize !text-gray-800">
                  Ingredients
                </Text>
                <Text
                  size="2xl"
                  as="p"
                  className="mt-[37px] w-[50%] capitalize leading-[46px] !text-black-900 md:w-full"
                >
                  {recipe.description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Text>
                <Text size="3xl" as="p" className="mt-[77px] capitalize !text-gray-800">
                  Video Step
                </Text>
                {/* Placeholder for video steps */}
                <div className="relative mt-[38px] h-[93px] w-[32%] md:h-auto">
                  <Img
                    src="/images/img_rectangle_314.png"
                    width={411}
                    height={93}
                    alt="video image"
                    className="h-[93px] w-full rounded-[15px] object-cover"
                  />
                  <Img
                    src="/images/img_play.svg"
                    width={34}
                    height={29}
                    alt="play button"
                    className="absolute left-0 right-0 top-[24.57px] m-auto h-[29px]"
                  />
                </div>
                {/* Additional video step placeholders */}
              </div>
              <div className="mt-[140px] flex flex-col items-start gap-10">
                <TextArea
                  shape="round"
                  name="Comment Field"
                  placeholder={`Comment :`}
                  className="self-stretch font-medium text-gray-700 sm:p-5"
                />
                <Button shape="round" className="ml-[390px] min-w-[426px] font-inter font-medium md:ml-0 sm:px-5">
                  Send
                </Button>
              </div>
              <div className="container-xs mt-12 flex flex-col items-start gap-[41px] px-[17px] md:p-5">
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
        <div className="container-xs px-[68px] md:p-5 md:px-5">
          <Text size="3xl" as="p" className="leading-[78px] !text-white-A700">
            Have a new ramen recipe? Let’s share!
          </Text>
        </div>
      </div>
    </>
  );
}
