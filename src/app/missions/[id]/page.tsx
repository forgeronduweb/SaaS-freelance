import MissionDetail from '@/components/mission/MissionDetail';

interface MissionDetailPageProps {
  params: {
    id: string;
  };
}

export default function MissionDetailPage({ params }: MissionDetailPageProps) {
  return <MissionDetail missionId={params.id} />;
}
