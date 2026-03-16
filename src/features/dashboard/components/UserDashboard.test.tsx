import { render, screen } from '@/test/test-utils';
import { describe, it, expect } from 'vitest';
import { UserDashboard } from './UserDashboard';

describe('UserDashboard', () => {
  it('deve listar os usuários retornados pela API (MSW)', async () => {
    render(<UserDashboard />);

    // Verificamos se o estado de loading aparece
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();

    // findByText espera o MSW responder e o TanStack Query atualizar a tela
    // Os nomes 'Jéssica Silva' e 'Dev Test' vêm do nosso handler do MSW
    expect(await screen.findByText(/João Silva/i)).toBeInTheDocument();
    expect(screen.getByText(/Dev Test/i)).toBeInTheDocument();
  });
});