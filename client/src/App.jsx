import React from 'react'
import { Route, Routes } from 'react-router'
import Home from "./pages/Home"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
