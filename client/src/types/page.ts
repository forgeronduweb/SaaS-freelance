// Types génériques pour les pages Next.js 15 App Router
export interface PageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Type spécifique pour les pages avec ID dynamique
export interface DynamicPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Type pour les pages avec slug dynamique
export interface SlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
