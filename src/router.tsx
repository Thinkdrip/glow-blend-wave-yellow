import { RootRoute, Router } from '@tanstack/react-router'
import { RootLayout } from './routes/__root'
import { IndexRoute } from './routes/index'

const rootRoute = new RootRoute({
  component: RootLayout,
})

const indexRoute = new IndexRoute({
  getParentRoute: () => rootRoute,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = new Router({ routeTree })

export function Router() {
  return <router.RouterProvider />
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
