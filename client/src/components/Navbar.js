import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userID")
  console.log(userId);

  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="w-full h-16 text-white flex items-center justify-center bg-gray-500 gap-12 font-bold uppercase static">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/save-recipe">Save Recipe </Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <div className="flex items-center gap-2">
          <p>{userId}</p>
          <button onClick={logout} className="bg-red-800 p-2 px-4 rounded-xl"> Logout </button>
        </div>
        
      )}
    </div>
  );
};

export default Navbar;
