import { useState } from 'react'
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
import Protected from './Component/Protected'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}/>
      <Route path="/Registation" element={<Registation/>}/>
      {/* <Route path='/' element={< Protected/>}> */}
      <Route element={<RootLayout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='/notification' element={<Notification/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Route>
      {/* </Route> */}

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
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <RouterProvider router={router}/>
// );

