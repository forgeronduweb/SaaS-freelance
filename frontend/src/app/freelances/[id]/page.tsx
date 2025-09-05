import FreelanceProfile from '@/components/freelance/FreelanceProfile';

interface FreelanceProfilePageProps {
  params: {
    id: string;
  };
}

export default function FreelanceProfilePage({ params }: FreelanceProfilePageProps) {
  return <FreelanceProfile freelanceId={params.id} />;
}
