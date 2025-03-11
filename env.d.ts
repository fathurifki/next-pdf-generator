declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_JSON_PLACEHOLDER_API_URL: string;
    NEXT_PUBLIC_RANDOM_USER_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
} 