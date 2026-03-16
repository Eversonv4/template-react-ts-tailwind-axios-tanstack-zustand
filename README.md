# 🚀 React Enterprise Starter - Feature Architecture

Este projeto utiliza uma das stacks mais modernas e robustas de 2026 para o ecossistema React. O foco principal é a **previsibilidade**, **testabilidade** e **facilidade de manutenção** através de uma arquitetura modular.

## 🛠 Stack Tecnológica

* **Runtime:** [Vite](https://vitejs.dev/) + React 19
* **Linguagem:** TypeScript (Strict Mode)
* **Roteamento:** [TanStack Router](https://tanstack.com/router) (Roteamento 100% tipado)
* **Gerenciamento de Dados:** [TanStack Query](https://tanstack.com/query) + [Axios](https://axios-http.com/)
* **Estado Global:** [Zustand](https://docs.pmnd.rs/zustand) (Minimalista e performático)
* **Formulários:** React Hook Form + [Zod](https://zod.dev/)
* **Estilização:** Tailwind CSS
* **Testes:** Vitest + React Testing Library + MSW (Mock Service Worker)

---

## 🏗 Arquitetura baseada em Funcionalidades (Features)

Diferente da estrutura tradicional, este projeto organiza o código por **Domínios de Negócio**. Isso permite que cada funcionalidade seja independente e fácil de escalar.

```
src/
├── api/                # Instância do Axios, interceptors de Auth e configurações de rede
├── components/         # Componentes de UI puramente globais e genéricos
├── config/             # Variáveis de ambiente e constantes do sistema
├── features/           # Núcleo da aplicação (Cada pasta é um módulo isolado)
│   ├── auth/           # Login, recuperação de senha, lógica de sessão
│   │   ├── api/        # Custom Hooks do TanStack Query (useLogin, useRegister)
│   │   ├── components/ # Componentes exclusivos da autenticação
│   │   ├── store/      # Zustand store para persistir dados do usuário/token
│   │   └── types/      # Schemas Zod e definições TypeScript
│   └── users/          # Exemplo de funcionalidade de usuários
├── routes/             # Definição centralizada de rotas e Guardas de Rota (Guards)
├── test/               # Utilitários de teste, wrappers e mocks do MSW
└── utils/              # Funções puras, formatadores de data/moeda, etc.
```

---

## 🚦 Começando

### 1. Instalação
Certifique-se de estar usando o Node.js v20+ e execute:
\`\`\`bash
npm install
\`\`\`

### 2. Desenvolvimento
Para rodar o projeto localmente com HMR (Hot Module Replacement):
\`\`\`bash
npm run dev
\`\`\`

### 3. Build de Produção
Para gerar os arquivos otimizados na pasta \`dist\`:
\`\`\`bash
npm run build
\`\`\`

---

## 🧪 Suíte de Testes

A aplicação utiliza uma abordagem de testes de integração com interceptação de rede:

* **Rodar Testes (Watch Mode):** \`npm test\`
* **Interface Gráfica:** \`npm run test:ui\`
* **Cobertura:** \`npm run coverage\`

> **Nota:** Foi usado o **MSW (Mock Service Worker)** para simular o backend. Os handlers de API ficam em \`src/test/mocks/handlers.ts\`.

---

## 🛡️ Roteamento e Proteção

O projeto utiliza o **TanStack Router**. As rotas são definidas em \`src/routes/index.tsx\`.
* **Type-safety:** Erros de navegação são pegos em tempo de compilação.
* **Auth Guards:** Rotas privadas utilizam o hook \`beforeLoad\` para redirecionar usuários não autenticados antes mesmo da renderização do componente.

---

## 💡 Melhores Práticas Implementadas

1.  **Validation First:** Todos os dados de entrada (Forms e API) passam pelo Zod.
2.  **Path Aliases:** Utilize \`@/\` para importar arquivos de qualquer lugar (\`@/features/...\`).
3.  **Headless UI:** Foco em componentes semânticos e acessíveis.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
