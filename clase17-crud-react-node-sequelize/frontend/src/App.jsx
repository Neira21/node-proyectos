import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ShowBlogs from './components/ShowBlogs'

function App() {
  return (
    <>
      <div className='header' >
        <img src={reactLogo} className="logo" alt="React logo" />
      </div>
      {/* BrowserRouter */}
      <ShowBlogs />
      
      
    </>
  )
}

export default App
