import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUtensils, faFire, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { MealProvider } from "./contexts/MealContext"
import Home from './pages/Home'

library.add(faUtensils, faFire, faPlus, faTrash)

export default function App() {
  return (
    <MealProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MealProvider>
  )
}
