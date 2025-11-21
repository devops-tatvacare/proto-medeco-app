"use client";

import { useRouter, useParams } from 'next/navigation';
import { MobileFrame } from '@/components/MobileFrame';
import { PathwayDetailView } from '@/components/care-pathways/PathwayDetailView';

export default function PathwayViewPage() {
  const router = useRouter();
  const params = useParams();
  const pathwayId = params.id as string;

  const handleBackClick = () => {
    router.push('/care-pathways?tab=create');
  };

  return (
    <MobileFrame>
      <PathwayDetailView pathwayId={pathwayId} onBack={handleBackClick} />
    </MobileFrame>
  );
}
