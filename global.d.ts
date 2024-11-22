// global.d.ts
export {};

declare global {
  interface PageProps {
    params: Record<string, string | string[]>;
    searchParams: Record<string, string | string[]>;
  }
}
