import MissionDetail from '@/components/mission/MissionDetail';
import { DynamicPageProps } from '@/types/page';

export default async function MissionDetailPage({ params }: DynamicPageProps) {
  const { id } = await params;
  return <MissionDetail missionId={id} />;
}
