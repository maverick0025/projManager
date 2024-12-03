import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Home from './pages/Home/Home'
import NavBar from './pages/NavBar/NavBar'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import { Route, Routes } from 'react-router-dom'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Upgrade from './pages/Subscription/Subscription'
import Subscription from './pages/Subscription/Subscription'
import Auth from './pages/Auth/Auth'

function App() {

  return (
    <>
    {false? <div>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/project/:id" element={<ProjectDetails/>}/>
        <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails/>}/>
        <Route path="/upgrade_plan" element={<Subscription/>}/>
        
      </Routes>
    </div> : <Auth/>
    
  }
      
    </>
  )
}

export default App
