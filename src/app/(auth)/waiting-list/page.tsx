import WaitingListPageInner from "@/components/waiting-list/WaitingListPageInner";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <WaitingListPageInner />
    </Suspense>
  );
}
