import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Home from './pages/Home/Home'
import NavBar from './pages/NavBar/NavBar'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/project/:id" element={<ProjectDetails/>}/>
        
      </Routes>
    </>
  )
}

export default App
