import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoutes, privateRoutes } from './privateRoutes'
import { PublicRoutes, publicRoutes } from './publicRoutes'

export const router = createBrowserRouter([
  // {
  //   element: <PrivateRoutes />,
  //   children: privateRoutes,
  // },
  {
    element: <PublicRoutes />,
    children: publicRoutes,
  }
])