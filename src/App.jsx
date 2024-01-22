import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../src/pages/login/Login'
import Registation from '../src/pages/registation/Registation'
import Home from './pages/home/Home'
import RootLayout from '../src/Component/roote/RootLayout'


import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Message from './pages/message/Message'
import Settings from './pages/settings/Settings'
import Notification from './pages/notification/Notification'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}/>
      <Route path="/Registation" element={<Registation/>}/>
      <Route element={<RootLayout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='/notification' element={<Notification/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Route>

    </>
  )
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
