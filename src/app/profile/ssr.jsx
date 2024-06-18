//src\app\profile\ssr.jsx
import axios from 'axios';
import ProfilePage from '../../app/profile/index';

export const getServerSideProps = async (context) => {
    console.log("masuk ssr")
  try {
    const token = context.req.cookies.token;
    const initialTab = context.query.tab || 'myRecipe';

    const [recipeResponse, userResponse] = await Promise.all([
      axios.get(`https://pijar-mama-recipe.vercel.app/v1/recipes/${initialTab === 'myRecipe' ? 'self' : initialTab}`, {
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

    const initialRecipes = initialTab === 'likedRecipe' || initialTab === 'savedRecipe'
      ? recipeResponse.data.data.map(item => item.recipe)
      : recipeResponse.data.data;

    const userName = userResponse.data.data.name || 'User';

    return {
      props: {
        initialTab,
        initialRecipes,
        userName,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialTab: 'myRecipe',
        initialRecipes: [],
        userName: 'User',
      },
    };
  }
};

export default ProfilePage;
