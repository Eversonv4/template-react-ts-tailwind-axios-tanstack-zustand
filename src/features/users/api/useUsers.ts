import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { User } from '../types';

// Hook para buscar todos os usuários
export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/users');
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
};

// Hook para criar um usuário (Mutation)
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => api.post('/users', newUser),
    onSuccess: () => {
      // Invalida o cache para forçar o refetch da lista atualizada
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};