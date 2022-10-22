import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from '../pages/Home'
import NewMeal from '../pages/NewMeal'
import ChooseEnergy from "../pages/ChooseEnergy"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal" element={<NewMeal />} />
        <Route path="/calories/choose" element={<ChooseEnergy />} />
      </Routes>
    </BrowserRouter>
  )
}
