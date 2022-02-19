import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './routes/Signin';
import OwnerHome from './routes/Home';
import RegisterPet from "./routes/PetOwner/RegisterPet";
import App from "./App";

import './style/global.scss';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/owner" element={<OwnerHome />} />
        <Route path="/owner/register" element={<RegisterPet />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;