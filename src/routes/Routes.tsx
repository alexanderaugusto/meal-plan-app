import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from '../pages/Home'
import Meal from '../pages/Meal'
import ChooseEnergy from "../pages/ChooseEnergy"
import Food from "../pages/Food"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/meal/food" element={<Food />} />
        <Route path="/calories/choose" element={<ChooseEnergy />} />
      </Routes>
    </BrowserRouter>
  )
}
