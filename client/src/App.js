import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css"


import Home from "./pages/Home.js";
import Auth from "./pages/Auth.js";
import CreateRecipe from "./pages/CreateRecipe.js";
import SaveRecipe from "./pages/SaveRecipe";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-gradient-to-r from-gray-500 to-black-600 w-full h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/save-recipe" element={<SaveRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
