import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';

// import { useAuthStore } from "@/features/auth/store/useAuthStore"

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: LoginFormValues) => api.post('/login', data),
    onSuccess: (res) => {
      // logica de sucesso
    }
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4">
      <input {...register('email')} className="border p-2" placeholder="Email" />
      {errors.email && <span className="text-red-500">{errors.email.message}</span>}

      <input type="password" {...register('password')} className="border p-2" />

      <button type="submit" className="bg-blue-500 text-white p-2 disabled:bg-gray-400" disabled={mutation.isPending}>
        {mutation.isPending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}