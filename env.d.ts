export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_JSON_PLACEHOLDER_API_URL: string;
      SECRET_RANDOM_USER_API_URL: string;
      NEXT_PUBLIC_JSON_PLACEHOLDER_API_URL: string;
      NEXT_PUBLIC_RANDOM_USER_API_URL: string;
    }
  }
}