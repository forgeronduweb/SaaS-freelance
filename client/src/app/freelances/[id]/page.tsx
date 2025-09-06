import FreelanceProfile from '@/components/freelance/FreelanceProfile';
import { DynamicPageProps } from '@/types/page';

export default async function FreelanceProfilePage({ params }: DynamicPageProps) {
  const { id } = await params;
  return <FreelanceProfile freelanceId={id} />;
}
