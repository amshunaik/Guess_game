import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Game/Home'
import Part from './Game/Part'
import Root from './Game/Root'
const App = () => {
  const router=createBrowserRouter([
    {path:"/", element:<Root/>, children:[
      
      {path:"/", element:<Home/>},
    {path:"/part/:id" ,element:<Part/>}


  ]}
    
  ])
  
  return (
    <div>
      <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
