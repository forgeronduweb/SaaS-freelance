import ClientProfile from '@/components/client/ClientProfile';
import { DynamicPageProps } from '@/types/page';

export default async function ClientProfilePage({ params }: DynamicPageProps) {
  const { id } = await params;
  return <ClientProfile clientId={id} />;
}
