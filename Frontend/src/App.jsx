import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/signup' element = {<Signup />} />
          <Route path = '/home' element= {<Home/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
