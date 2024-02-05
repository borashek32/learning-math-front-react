import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoutes, privateRoutes } from './privateRoutes'
import { publicRoutes } from './publicRoutes'

export const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  // ...privateRoutes,
  ...publicRoutes
])