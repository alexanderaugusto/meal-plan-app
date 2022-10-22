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
  faPen,
  faMale,
  faFemale,
  faMars,
  faVenus,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons"
import { MealProvider } from "./contexts/MealContext"
import { UserProvider } from "./contexts/UserContext"
import Routes from './routes/Routes'

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
  faChevronLeft,
  faChevronRight,
  faTimes,
  faCheck,
  faPen,
  faMale,
  faFemale,
  faMars,
  faVenus
)

export default function App() {
  return (
    <UserProvider>
      <MealProvider>
        <Routes />
      </MealProvider>
    </UserProvider>
  )
}
