import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../features/auth/store/useAuthStore';

// Rota Raiz (Layout Global)
const rootRoute = createRootRoute();

// Rota Pública (Login)
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  // component: LoginComponent,
});

// Rota Privada (Dashboard)
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    const { token } = useAuthStore.getState();
    if (!token) throw redirect({ to: '/login' });
  },
  // component: DashboardComponent,
});

const routeTree = rootRoute.addChildren([loginRoute, dashboardRoute]);
export const router = createRouter({ routeTree });