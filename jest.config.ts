import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1', // Alias para componentes
    '^@context/(.*)$': '<rootDir>/src/context/$1', // Alias para contextos
    '^@styles/(.*)$': '<rootDir>/src/styles/$1', // Alias para estilos
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock para arquivos CSS/SCSS
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Arquivo de configuração adicional
  moduleDirectories: ['node_modules', '<rootDir>/src'], // Adiciona 'src' como raiz do projeto
  testMatch: ['<rootDir>/tests/**/*.test.{ts,tsx}'], // Modificado para garantir compatibilidade com TypeScript
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Configura transformação para arquivos TypeScript
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'], // Ignorar transformação de dependências de node_modules
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Garantir que o tsconfig seja usado pelo ts-jest
    },
  },
};

export default config;
