import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './routes/Signin';
import OwnerProfile from './routes/PetOwner/Profile'
import RegisterPet from "./routes/PetOwner/RegisterPet";
import Home from './routes/Home';
import Header from "./components/Header";
import EditProfile from './routes/PetOwner/EditProfile'

import './style/global.scss';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/owner" element={<Home />} /> */}
        <Route path="/owner/profile" element={<OwnerProfile />} />
        <Route path="/owner/edit_profile" element={<EditProfile />} />
        <Route path="/owner/register" element={<RegisterPet />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;