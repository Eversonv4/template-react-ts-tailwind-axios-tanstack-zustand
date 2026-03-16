import { useGetUsers, useCreateUser } from '@/features/users/api/useUsers';
import { useState } from 'react';

export function UserDashboard() {
  const { data: users, isLoading, isError } = useGetUsers();
  const createUserMutation = useCreateUser();
  const [userName, setUserName] = useState('');

  const handleAddUser = () => {
    if (!userName) return;
    createUserMutation.mutate({ name: userName });
    setUserName('');
  };

  if (isLoading) return <div className="p-8 text-center">Carregando usuários...</div>;
  if (isError) return <div className="p-8 text-red-500">Erro ao carregar dados.</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Painel de Usuários</h1>

      {/* Seção de Adição */}
      <div className="flex gap-2 mb-8">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded flex-1 dark:bg-zinc-800"
          placeholder="Nome do novo usuário"
        />
        <button
          onClick={handleAddUser}
          disabled={createUserMutation.isPending}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {createUserMutation.isPending ? 'Salvando...' : 'Adicionar'}
        </button>
      </div>

      {/* Lista de Usuários */}
      <ul className="space-y-2">
        {users?.map((user) => (
          <li key={user.id} className="p-4 bg-white dark:bg-zinc-900 shadow rounded border border-zinc-200 dark:border-zinc-800">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}