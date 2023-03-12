import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold p-5 uppercase">Create Recipe</h2>
      <div className="w-full justify-center items-center flex h-[80vh]">
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden bg-gray-600 p-10 drop-shadow-xl space-y-2 rounded-md">
          <label htmlFor="name" className="text-white">Name</label>
          <input
          className="rounded-md pl-2"
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
          <label className="text-white" htmlFor="description">Description</label>
          <textarea
          className="rounded-md pl-2"
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
          <label className="text-white" htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              className="rounded-md pl-2"
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button className="bg-red-800 p-2 rounded-md font-bold text-white" type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <label className="text-white" htmlFor="instructions">Instructions</label>
          <textarea
          className="rounded-md pl-2"
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
          <label className="text-white" htmlFor="imageUrl">Image URL</label>
          <input
          className="rounded-md pl-2"
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <label className="text-white" htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
          className="rounded-md pl-2"
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <button className="bg-red-800 p-2 text-white font-bold rounded-md" type="submit">Create Recipe</button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
