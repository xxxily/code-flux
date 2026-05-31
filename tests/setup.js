import { vi } from 'vitest';
import { config } from '@vue/test-utils';

// 全局 Mock
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn()
};

// Vue Test Utils 全局配置
config.global.mocks = {
  $eventEmitter: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn()
  }
};

// Mock Monaco Editor
vi.mock('monaco-editor', () => ({
  editor: {
    create: vi.fn(() => ({
      getValue: vi.fn(() => ''),
      setValue: vi.fn(),
      dispose: vi.fn(),
      onDidChangeModelContent: vi.fn(),
      getModel: vi.fn(() => ({
        getValue: vi.fn(() => ''),
        setValue: vi.fn()
      }))
    })),
    defineTheme: vi.fn(),
    setTheme: vi.fn()
  },
  languages: {
    register: vi.fn(),
    setMonarchTokensProvider: vi.fn(),
    setLanguageConfiguration: vi.fn()
  }
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.sessionStorage = sessionStorageMock;
