import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './routes/Signin';
import OwnerHome from './routes/PetOwner/Home';

import './style/global.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/">
            <Route index element={<Signin />} />

            <Route path="owner" element={<OwnerHome />} >
              {/* pet owner's page here */}
              <Route path="" />
            </Route>

            <Route path="walker" >
              {/* pet walker's page here */}
              
            </Route>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
