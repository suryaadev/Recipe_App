import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div>
      <h1 className="text-center p-2 text-2xl uppercase">Saved Recipes</h1>
      <ul className=" p-6 text-white">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id} className=" mb-3 flex space-y-3 flex-col border-2 p-5 gap-2">
            <div>
              <h2 className="mb-3">{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <img className="w-[200px] h-[200px]" src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;