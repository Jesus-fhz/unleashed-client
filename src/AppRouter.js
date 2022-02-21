import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OwnerProfile from './routes/PetOwner/Profile'
import RegisterPet from "./routes/PetOwner/RegisterPet";
import Home from './routes/Home';
import EditProfile from './routes/PetOwner/EditProfile'

import './style/global.scss';
import TrackWalker from "./routes/PetOwner/TrackWalker";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/owner" element={<Home />} /> */}
        <Route path="/owner/profile" element={<OwnerProfile />} />
        <Route path="/owner/edit_profile" element={<EditProfile />} />
        <Route path="/owner/register" element={<RegisterPet />} />
        <Route path="/owner/found-walker" element={<TrackWalker />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;