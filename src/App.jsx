import Header from "./components/Header"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Transfer from "./pages/Transfer"


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn/>}></Route>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/transfer" element={<Transfer/>}/>
    </Routes>
    
    
    </BrowserRouter>
    </>
  )
}

export default App
