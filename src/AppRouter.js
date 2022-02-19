import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './routes/Signin';
import OwnerHome from './routes/Home';
import RegisterPet from "./routes/PetOwner/RegisterPet";
import Home from './routes/Home';
import Header from "./components/Header";

import './style/global.scss';



const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/owner" element={<OwnerHome />} />
        <Route path="/owner/register" element={<RegisterPet />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;