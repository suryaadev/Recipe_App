import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home.js";
import Auth from "./pages/Auth.js";
import CreateRecipe from "./pages/CreateRecipe.js";
import SaveRecipe from "./pages/SaveRecipe";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
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
