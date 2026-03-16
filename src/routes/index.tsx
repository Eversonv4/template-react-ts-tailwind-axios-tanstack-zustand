import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { UserDashboard } from '@/features/dashboard/components/UserDashboard';
import { LoginForm } from '@/features/auth/components/LoginForm';

// 1. Rota Raiz (O "esqueleto" que envolve todas as páginas)
const rootRoute = createRootRoute();

// 2. Rota de Login (Pública)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginForm,
});

// 3. Rota de Dashboard (Privada)
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', // Rota inicial protegida

  // O "GUARD" acontece aqui:
  beforeLoad: ({ location }) => {
    // Acessamos o estado do Zustand fora dos hooks usando .getState()
    const { token } = useAuthStore.getState();

    if (!token) {
      // Se não estiver logado, manda para o login e salva para onde ele queria ir
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: UserDashboard,
});

// 4. Montagem da árvore de rotas
const routeTree = rootRoute.addChildren([loginRoute, dashboardRoute]);

// 5. Criação do roteador
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent', // Performance: pré-carrega a rota quando o usuário passa o mouse no link
});

// Necessário para o TypeScript reconhecer as rotas no seu app
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}