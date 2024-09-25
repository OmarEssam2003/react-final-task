import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";  // Assuming your Home component path
import PostDetails from "./Components/PostDetails/PostDetails";  // Import the new PostDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />  {/* New Route for Post Details */}
      </Routes>
    </Router>
  );
}

export default App;
