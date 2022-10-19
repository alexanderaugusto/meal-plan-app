import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faUtensils,
  faFire,
  faPlus,
  faTrash,
  faArrowLeft,
  faSubtract,
  faAppleAlt,
  faEgg,
  faDrumstickBite,
  faLemon,
  faFish,
  faStroopwafel,
  faCarrot,
  faPepperHot,
  faCheese,
  faCookie,
  faHamburger,
  faHotdog,
  faIceCream,
  faPizzaSlice,
  faBreadSlice,
  faChevronRight,
  faTimes,
  faCheck,
  faPen
} from "@fortawesome/free-solid-svg-icons"
import { MealProvider } from "./contexts/MealContext"
import Home from './pages/Home'
import NewMeal from './pages/NewMeal'

library.add(faUtensils,
  faFire,
  faPlus,
  faTrash,
  faArrowLeft,
  faSubtract,
  faAppleAlt,
  faEgg,
  faDrumstickBite,
  faLemon,
  faFish,
  faStroopwafel,
  faCarrot,
  faPepperHot,
  faCheese,
  faCookie,
  faHamburger,
  faHotdog,
  faIceCream,
  faPizzaSlice,
  faBreadSlice,
  faChevronRight,
  faTimes,
  faCheck,
  faPen
)

export default function App() {
  return (
    <MealProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal" element={<NewMeal />} />
        </Routes>
      </BrowserRouter>
    </MealProvider>
  )
}
