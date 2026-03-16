import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './routes'; // O roteador que configuramos

// Criamos uma instância do QueryClient para gerenciar o cache global
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de cache padrão
      retry: 1, // Tenta novamente apenas 1 vez em caso de erro
    },
  },
});

export default function App() {
  return (
    // Provedor de dados (TanStack Query)
    <QueryClientProvider client={queryClient}>

      {/* Provedor de Rotas (TanStack Router) */}
      <RouterProvider router={router} />

      {/* Ferramentas de debug do Query (só aparecem em desenvolvimento) */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider>
  );
}