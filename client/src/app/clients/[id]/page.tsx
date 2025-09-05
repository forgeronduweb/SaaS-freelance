import ClientProfile from '@/components/client/ClientProfile';

interface ClientProfilePageProps {
  params: {
    id: string;
  };
}

export default function ClientProfilePage({ params }: ClientProfilePageProps) {
  return <ClientProfile clientId={params.id} />;
}
