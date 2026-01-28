import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from '../lib/components/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
  ),
})
