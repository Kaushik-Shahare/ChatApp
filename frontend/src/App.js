import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

function App() {
  return (
    <div className="h-screen w-1/1 flex items-center justify-center">
      {/* <div> */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
