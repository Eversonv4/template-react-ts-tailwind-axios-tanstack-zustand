import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginForm } from './LoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('LoginForm', () => {
  it('deve exibir mensagem de erro se o email for inválido', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.click(submitButton);

    // O Zod disparará o erro e o React Hook Form mostrará na tela
    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
  });
});