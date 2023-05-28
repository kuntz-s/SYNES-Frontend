import React from 'react';
import { RouterProvider } from 'react-router';
import {router} from "./router/router";


const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
    
  )
}

export default App