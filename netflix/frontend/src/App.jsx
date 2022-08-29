import "./app.scss"
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authC/AuthContext";

const App = () => {
  const {userN}=useContext(AuthContext)
  return (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={userN?<Home />: <Navigate to="/register" /> } />
          <Route path="/register" element={!userN?<Register />: <Navigate to="/" /> } />
          <Route path="/login" element={!userN?<Login />: <Navigate to="/" /> } />
          {userN && 
          <>
          <Route path="/movies" element={<Home type="movie"/>} />
          <Route path="/series" element={<Home type="series"/>} />
          <Route path="/watch" element={<Watch/>} />
          </>
          }
        </Routes>
    </BrowserRouter>
    )
};

export default App;